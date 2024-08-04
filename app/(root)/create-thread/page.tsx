import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
// libs
import { fetchUser } from "@/lib/actions/user.actions"
// components
import PostThread from "@/components/forms/PostThread"

export default async function Page() {
  const user = await currentUser()
  if (!user) redirect('/sign-in')

  const userInfo = await fetchUser(user.id)

  if(!userInfo || !userInfo.onboarded) {
    redirect('/onboarding')
  }
  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={user.id} />
    </>

  )
}