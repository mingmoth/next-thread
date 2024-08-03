"use client"

import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { useRouter } from "next/navigation";

import { communityTabs } from "@/constants";

import UserCard from "@/components/cards/UserCard";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchCommunityDetails } from "@/lib/actions/community.actions";




export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  // const user = await currentUser;
  // if (!user) return null;

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

  // const communityDetails = await fetchCommunityDetails(params.id);

  const communityDetails = {
    _id: '1',
    createdBy: {
      id: '1',
    },
    name: 'Community 1',
    username: 'community1',
    image: 'https://i.pravatar.cc/100',
    bio: 'Community 1 bio',
    threads: [
      {
        _id: '1',
      }
    ],
    members: [
      {
        _id: '1',
        name: 'member 1',
        username: 'member11',
        image: 'https://i.pravatar.cc/200',
      }
    ],
  }

  const onClickUserCard = (id: string) => {
    router.push(`/profile/${id}`)
  }

  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.createdBy.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        image={communityDetails.image}
        bio={communityDetails.bio}
        type='Community'
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {communityDetails.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='threads' className='w-full text-light-1'>
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType='Community'
            />
          </TabsContent>

          <TabsContent value='members' className='mt-9 w-full text-light-1'>
            <section className='mt-9 flex flex-col gap-10'>
              {communityDetails.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType='User'
                  onClick={() => onClickUserCard(member.id)}
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value='requests' className='w-full text-light-1'>
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType='Community'
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
