import { fetchThreads } from "@/lib/actions/thread.actions";
// components
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {
  const result = {
    threads: [
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
            author: 'user1',
            createdAt: new Date(),
          },
          {
            id: '1-2',
            text: 'Thread 1-2',
            parentId: '1',
            author: 'user1',
            createdAt: new Date(),
          },
        ],
        community: null,
      },
    ],
    hasNext: false
  }

  // const result = await fetchThreads({
  //   page: 1,
  //   total: 30,
  // })

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        { result.threads?.length === 0
          ? <p className="no-result">No Threads Found</p>
          : <>
            { result.threads?.map((thread) => (
              <ThreadCard
                key={thread.id}
                id={thread.id}
                author={thread.author}
                comments={thread.children}
                community={thread.community}
                content={thread.text}
                createdAt={thread.createdAt}
                currentUserId="user1"
                parentId={thread.parentId}
              />
            ))
            }</>
        }
      </section>
    </>
  );
}
