interface Author {
  id: string,
  name: string,
  image: string,
}

interface Community {
  id: string,
  name: string,
  image: string,
}

interface Comment {
  id: string
  text: string
  author: string
  parentId: string
  createdAt: Date,
}

interface ThreadProps {
  id: string,
  author: Author,
  comments: Comment[],
  community: Community | null,
  content: string,
  createdAt: Date,
  currentUserId: string,
  isComment?: boolean,
  parentId: string | null,
}

export default function ThreadCard({
  id,
  author,
  comments,
  community,
  content,
  createdAt,
  currentUserId,
  parentId,
}: ThreadProps) {
  return (
    <article>
      <h2 className="text-small-regular text-light-2">
        {content}
      </h2>
    </article>
  )
}