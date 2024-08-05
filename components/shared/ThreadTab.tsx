import { redirect } from "next/navigation";
import { fetchUserThreads } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";

import type { ThreadTabsResult } from "@/constants/types";

interface ThreadTabProps {
  currentUserId: string,
  accountId: string,
  accountType: string,
}

export default async function ThreadTab({
  currentUserId,
  accountId,
  accountType,
}: ThreadTabProps) {
  let result: ThreadTabsResult | undefined

  // result = await fetchUserThreads(accountId);

  // mock data
  result = {
    name: 'User 1',
    image: 'https://i.pravatar.cc/300',
    id: '1',
    threads: [{
      _id: '1',
      text: 'Thread 1',
      parentId: null,
      author: {
        name: 'User 1',
        image: 'https://i.pravatar.cc/200',
        id: '1',
      },
      community: null,
      createdAt: '2022-01-01T00:00:00.000Z',
      children: [],
    }],
  }

  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result && result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          text={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                name: thread.author.name,
                image: thread.author.image,
                id: thread.author.id,
              }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  )
}