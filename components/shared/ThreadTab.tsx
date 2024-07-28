import { redirect } from "next/navigation";
import { fetchUserThreads } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";

interface ThreadTabProps {
  currentUserId: string,
  accountId: string,
  accountType: string,
}

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: Date;
    children: [];
  }[];
}

export default async function ThreadTab({
  currentUserId,
  accountId,
  accountType,
}: ThreadTabProps) {
  let result: Result | undefined

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
      createdAt: new Date(),
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
          content={thread.text}
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