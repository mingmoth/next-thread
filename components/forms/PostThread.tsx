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

  return (
    <>
      <h1>Post Thread Form</h1>
    </>
  )
}