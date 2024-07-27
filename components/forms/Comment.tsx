"use client"

import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { usePathname } from "next/navigation"
// components
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
// libs
import { CommentValidation } from '@/lib/validations/thread'
import { addCommentToThread } from "@/lib/actions/thread.actions"

interface Props {
    threadId: string,
    userId: string,
    userImg: string
}

export default function Comment({ threadId, userId, userImg }: Props) {
    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            comment: '',
            accountId: threadId,
        }
    })

    const pathname = usePathname()

    async function onSubmit(values: z.infer<typeof CommentValidation>) {
        try {
            await addCommentToThread(
                threadId,
                values.comment,
                userId,
                pathname,
            )

        } catch (error) {
            alert(`Failed to post thread: ${error}`)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="comment-form"
            >
                {/* Name */}
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem className="flex w-full items-center gap-3">
                            <FormLabel>
                                <Image
                                    src={userImg}
                                    alt='current_user'
                                    width={48}
                                    height={48}
                                    className='rounded-full object-cover'
                                />
                            </FormLabel>
                            <FormControl className="border-none bg-transparent">
                                <Textarea
                                    rows={5}
                                    {...field}
                                    placeholder="Add a comment..."
                                    className='no-focus text-light-1 outline-none'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="comment-form_btn">Reply</Button>
            </form>
        </Form>
    )
}