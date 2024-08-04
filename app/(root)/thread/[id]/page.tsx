// components
import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";
// lib
import { fetchThreadById } from "@/lib/actions/thread.actions";

export default async function Thread({ params }: { params: { id: string } }) {
  // const thread = await fetchThreadById(params.id)

  // mock data
  const thread = {
    id: '1',
    text: 'Next-Thread First Post in the Community',
    parentId: 'parent1',
    author: {
      id: 'user1',
      name: 'User 1',
      image: 'https://i.pravatar.cc/300',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
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
        createdAt: '2022-01-01T00:00:00.000Z',
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
        createdAt: '2022-01-01T00:00:00.000Z',
        comments: [],
        community: null,
      },
    ],
    community: null,
  }

  return (
    <section>
      <ThreadCard
        key={thread.id}
        id={thread.id}
        author={thread.author}
        comments={thread.children}
        community={thread.community}
        content={thread.text}
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
        {thread.children?.map((child) => (
          <ThreadCard
            key={child.id}
            id={child.id}
            author={child.author}
            content={child.text}
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