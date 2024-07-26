"use client"

import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { usePathname, useRouter } from "next/navigation"
// components
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
import { ThreadValidation } from '@/lib/validations/thread'
// import { updateUser } from "@/lib/actions/user.actions"


interface Props {
  userId: string
}

export default function PostThread({ userId }: Props) {
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    }
  })

  async function onSubmit(values: z.infer<typeof ThreadValidation>) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Thread
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-3">
              <Textarea
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">Post Thread</Button>
      </form>
    </Form>
  )
}