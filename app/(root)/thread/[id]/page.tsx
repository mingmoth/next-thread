// components
import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";
// lib
import { fetchThreadById } from "@/lib/actions/thread.actions";

import type { ThreadProps } from "@/constants/types";

export default async function Thread({ params }: { params: { id: string } }) {
  const thread = await fetchThreadById(params.id)

  return (
    <section>
      <ThreadCard
        key={thread.id}
        id={thread.id}
        author={thread.author}
        comments={thread.comments}
        community={thread.community}
        text={thread.text}
        createdAt={thread.createdAt}
        currentUserId="user1"
        isComment={thread.children?.length > 0}
        parentId={thread.parentId}
      />
      <div className="mt-7">
        <Comment
          threadId={thread.id}
          userId={thread.author.id}
          userImg={thread.author.image}
        />
      </div>
      <div className="mt-10">
        {thread.comments?.map((child: ThreadProps) => (
          <ThreadCard
            key={child.id}
            id={child.id}
            author={child.author}
            text={child.text}
            createdAt={child.createdAt}
            currentUserId="user1"
            parentId={child.parentId}
            community={child.community || null}
            comments={child.comments || []}
          />
        ))}
      </div>
    </section>
  )
}