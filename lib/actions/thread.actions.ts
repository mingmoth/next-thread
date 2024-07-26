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