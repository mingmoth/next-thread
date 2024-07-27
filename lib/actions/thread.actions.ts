"use server"

import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { revalidatePath } from "next/cache"

interface ThreadParams {
  id: string,
  text: string,
  author: string,
  communityId: string | null,
  path: string
}

export async function createThread({
  id,
  text,
  author,
  communityId,
  path
}: ThreadParams): Promise<void> {
  try {
    connectToDB()

    const createThread = await Thread.create({
      id,
      text,
      author,
      community: null,
    })

    // Update User with new thread
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    })

    revalidatePath(path)
  } catch (error) {
    throw new Error(`Failed to create thread: ${error}`)
  }
}

export async function fetchThreads({
  page = 1,
  total = 20,
}) {
  try {
    connectToDB()

    // Calculate the number of threads to skip
    const skipAmount = (page - 1) * total

    // Fetch the threads that has no parents (top level threads)
    const threadsQuery = Thread
      .find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(total)
      .populate({ path: 'author', model: User })
      .populate({
        path: 'children',
        populate: {
          path: 'author',
          model: User,
          select: "_id name parentId image",
        }
      })

    const totalThreadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] }
    })

    const threads = await threadsQuery.exec()
    const hasNext = totalThreadsCount > skipAmount + threads.length

    return {
      threads,
      hasNext,
    }
  } catch (error) {
    throw new Error(`Failed to fetch threads: ${error}`)
  }
}

export async function fetchThreadById(id: string) {
  try {
    connectToDB()

    const thread = await Thread.findById(id)
      .populate({
        path: 'author',
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: 'children',
        populate: [
          { path: 'author', model: User, select: "_id id name parentId image" },
          {
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: User,
              select: "_id id name parentId image",
            }
          },
        ]
      })
      .exec()
    // TODO: populate community

    return thread
  } catch (error) {
    throw new Error(`Failed to fetch thread by ${id}: ${error}`)
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create the new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, // Set the parentId to the original thread's ID
    });

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save();

    // Add the comment thread's ID to the original thread's children array
    originalThread.children.push(savedCommentThread._id);

    // Save the updated original thread to the database
    await originalThread.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}