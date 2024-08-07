import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserThreads } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";

interface Author {
  id: string,
  name: string,
  image: string,
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
    createdAt: string;
    children: {
      id: string
  text: string
  author: Author
  parentId: string
  createdAt: string,
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  result = {
    name: 'User 1',
    image: 'https://i.pravatar.cc/300',
    id: '1',
    threads: [
      {
        _id: '1',
        text: 'Thread 1',
        parentId: null,
        author: {
          name: 'User 1',
          image: 'https://i.pravatar.cc/300',
          id: '1',
        },
        community: null,
        createdAt: new Date().toISOString(),
        children: [],
      },
      {
        _id: '2',
        text: 'Thread 2',
        parentId: null,
        author: {
          name: 'User 2',
          image: 'https://i.pravatar.cc/300',
          id: '2',
        },
        community: null,
        createdAt: new Date().toISOString(),
        children: [],
      }
    ],
  }


  // if (accountType === "Community") {
  //   result = await fetchCommunityPosts(accountId);
  // } else {
  //   result = await fetchUserThreads(accountId);
  // }

  // if (!result) {
  //   redirect("/");
  // }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.threads.map((thread) => (
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
  );
}

export default ThreadsTab;