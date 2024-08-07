"use client"

import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ChangeEvent, useState } from "react"

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
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import Image from "next/image"
// libs
import { UserValidation } from '@/lib/validations/user'
import { useUploadThing } from '@/lib/uploadthing'
import { isBase64Image } from "@/lib/utils"
import { updateUser } from "@/lib/actions/user.actions"


interface Props {
  user: {
    id: string,
    username: string,
    name: string,
    bio: string,
    image: string
  }
  btnTitle: string
}

export default function AccountProfile({ user, btnTitle }: Props) {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || '',
      name: user?.name || '',
      username: user?.username ||'',
      bio: user?.bio || '',
    }
  })

  const [file, setFile] = useState<File[]>([])

  function handleImage(e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) {
    e.preventDefault()

    if(e.target.files && e.target?.files?.length > 0) {
      const file = e.target.files[0]
      setFile(Array.from(e.target.files))

      if(!file.type.includes('image')) return

      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageDataUrl = e.target?.result?.toString() || ''
        if(imageDataUrl) {
          fieldChange(imageDataUrl)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const { startUpload } = useUploadThing("media")
  const router = useRouter()
  const pathname = usePathname()

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const blob = values.profile_photo
    if(!blob) return

    const hasImageChanged = isBase64Image(blob)
    if(hasImageChanged) {
      const uploadResult = await startUpload(file)

      if(uploadResult && uploadResult[0].url) {
        values.profile_photo = uploadResult[0].url
      }
    }

    // console.log(values)
    // TODO: Update user profile
    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio || '',
      image: values.profile_photo || '',
      path: pathname,
    })

    if(pathname === '/profile/edit') {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        {/* Profile Photo */}
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value
                  ? <Image
                      src={field.value}
                      alt="Profile Photo"
                      width={48}
                      height={48}
                      priority
                      className="rounded-full object-contain"
                    />
                  : <Image
                      src="/assets/profile.svg"
                      alt="Profile Photo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                }
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Profile Photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display photo.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Biography */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
              Biography
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">Submit</Button>
      </form>
    </Form>
  )
}
