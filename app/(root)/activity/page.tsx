import Image from "next/image"
import Link from "next/link"

import { getUserActivities } from "@/lib/actions/user.actions"

export default async function Activity() {
  // const activities = await getUserActivities()

  const activities = [
    {
      id: '1',
      text: 'Next-Thread First Post in the Community',
      parentId: 'parent1',
      author: {
        id: 'user1',
        name: 'User 1',
        image: 'https://i.pravatar.cc/300',
      },
      createdAt: new Date(),
      children: [
        {
          id: '1-1',
          text: 'Thread 1-1',
          parentId: '1',
          author: {
            id: 'user-2',
            name: 'User 2',
            image: 'https://i.pravatar.cc/300',
          },
          createdAt: new Date(),
          comments: [],
          community: null,
        },
        {
          id: '1-2',
          text: 'Thread 1-2',
          parentId: '1',
          author: {
            id: 'user-3',
            name: 'User 3',
            image: 'https://i.pravatar.cc/500',
          },
          createdAt: new Date(),
          comments: [],
          community: null,
        },
      ],
      community: null,
    }
  ]

  const hasUserActivities = Array.isArray(activities) && activities.length > 0
  return (
    <>
      <h1 className='head-text'>Activity</h1>
      <section className='mt-10 flex flex-col gap-5'>
        {!hasUserActivities
          ? (
            <p className='!text-base-regular text-light-3'>No activity yet</p>
          )
          : activities.map((activity) => (
            <Link key={activity.id} href={`/thread/${activity.parentId}`}>
              <article className="activity-card">
                <Image
                  src={activity.author.image}
                  alt='user_logo'
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
                <p className="text-small-regular text-light-1">
                  <span className='mr-1 text-primary-500'>
                    {activity.author.name}
                  </span>{" "}
                  replied to your thread
                </p>
              </article>
            </Link>
          ))
        }
      </section>
    </>
  )
}