import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
// libs
import { fetchUser } from "@/lib/actions/user.actions"
// constants
import { profileTabs } from "@/constants"

export default async function Profile({ params }: { params: { id: string } }) {
  // const userInfo = await fetchUser(params.id)

  // if(!userInfo) {
  //   return (
  //     <section>
  //       <h1 className="head-text">User Not Found</h1>
  //     </section>
  //   )
  // }
  return (
    <section>
      <h1 className="head-text">Profile</h1>
    </section>
  )
}