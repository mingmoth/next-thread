"use server"

import { revalidatePath } from "next/cache"
import User from "../models/user.model"
import { connectToDB } from "../mongoose"
import path from "path"

interface Params {
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
}

export async function fetchUser(userId: string) {
  try {
    connectToDB()

    return await User
      .findOne({ id: userId })
    // .populate({
    //   path: 'communities',
    //   model: 'Community',
    // })

  } catch (error) {
    console.error(error)
    throw new Error(`Failed to fetch user: ${error}`)
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
            model: 'Community',
            select: '_id id name image',
          },
          {
            path: 'children',
            model: 'Thread',
            populate: {
              path: 'author',
              model: 'User',
              select: '_id id name parentId image',
            }
          }
        ]
      })

    return threads
  } catch (error) {
    throw new Error(`Failed to fetch user threads: ${error}`)
  }
}