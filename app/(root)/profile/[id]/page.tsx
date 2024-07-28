import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
// libs
import { fetchUser } from "@/lib/actions/user.actions"
// constants
import { profileTabs } from "@/constants"
// components
import ProfileHeader from "@/components/shared/ProfileHeader"

export default async function Profile({ params }: { params: { id: string } }) {
  // const userInfo = await fetchUser(params.id)

  // if(!userInfo) {
  //   return (
  //     <section>
  //       <h1 className="head-text">User Not Found</h1>
  //     </section>
  //   )
  // }

  // mock data
  const userInfo = {
    id: '1',
    name: 'User 1',
    username: 'user1',
    bio: 'User 1 Bio',
    image: 'https://i.pravatar.cc/300',
  }
  const user = {
    id: '2',
    name: 'User 2',
    username: 'user2',
    bio: 'User 2 Bio',
    image: 'https://i.pravatar.cc/300',
  }

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        image={userInfo.image}
        bio={userInfo.bio}
      />
    </section>
  )
}