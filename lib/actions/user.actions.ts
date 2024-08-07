"use server"

import { FilterQuery, ObjectId, SortOrder } from "mongoose"
import { revalidatePath } from "next/cache"
import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model"
import { connectToDB } from "../mongoose"

interface Params {
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
}

interface MongoUser {
  _id: string,
  id: string,
  __v: number,
  bio: string,
  communities: [],
  image: string,
  name: string,
  onboarded: boolean,
  threads: [],
  username: string
}

export async function fetchUser(userId: string) {
  try {
    connectToDB()

    const userInfo: MongoUser | null = await User
      .findOne({ id: userId })
      .populate({
        path: 'communities',
        model: Community,
      })
      .lean()

    if(!userInfo) return false

    const { _id, ...rest } = userInfo
    return {...rest}

  } catch (error) {
    console.error(error)
    return false
  }
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDB()

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true } // update and insert
    )

    if (path === '/profile/edit') {
      revalidatePath(path)
    }
  } catch (error) {
    throw new Error(`Failed to update user: ${error}`)
  }
}

export async function fetchUserThreads(userId: string) {
  try {
    connectToDB()

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ id: userId })
      .populate({
        path: 'threads',
        model: 'Thread',
        populate: [
          {
            path: 'community',
            model: Community,
            select: '_id id name image', // Select the "name" and "_id" fields from the "Community" model
          },
          {
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: 'User',
              select: '_id id name parentId image', // Select the "name" and "_id" fields from the "User" model
            }
          }
        ]
      })

    return threads
  } catch (error) {
    throw new Error(`Failed to fetch user threads: ${error}`)
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, // Exclude the current user from the results.
    };

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length;

    const totalPage = Math.ceil(totalUsersCount / pageSize);

    return { users, totalPage, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getUserActivities(userId: string) {
  try {
    connectToDB();

    // Find all threads created by the user
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "_id name image",
    });

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}