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
      .find({ parentId: { $in: [null, undefined]} })
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
        parentId: { $in: [null, undefined]}
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