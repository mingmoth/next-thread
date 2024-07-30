import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
// libs
import { fetchUser } from "@/lib/actions/user.actions"
// constants
import { profileTabs } from "@/constants"
// components
import Image from "next/image"
import ProfileHeader from "@/components/shared/ProfileHeader"
import ThreadTab from "@/components/shared/ThreadTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    threads: [],
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

      <div className="mt-9">
        <Tabs defaultValue={profileTabs[0].value}>
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full text-light-1'
            >
              <ThreadTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}