import { fetchThreads } from "@/lib/actions/thread.actions";
// components
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {
  const result = await fetchThreads({
    page: 1,
    total: 30,
  })

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        { result && result?.threads && result?.threads?.length !== 0
          ? <>
            { result.threads?.map((thread) => (
              <ThreadCard
                key={thread.id}
                id={thread.id}
                author={thread.author}
                comments={thread.children}
                community={thread.community}
                text={thread.text}
                createdAt={thread.createdAt}
                currentUserId="user1"
                isComment={thread.children?.length > 0}
                parentId={thread.parentId}
              />
            ))
            }</>
          : <p className="no-result">No Threads Found</p>
        }
      </section>
    </>
  );
}
