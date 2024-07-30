import Image from "next/image"
import Link from "next/link"

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
  author: Author
  parentId: string
  createdAt: Date,
}

interface ThreadProps {
  id: string,
  author: Author,
  comments: Comment[] | [],
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
  isComment,
  parentId,
}: ThreadProps) {
  return (
    <article className="flex flex-col w-full rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-row flex-1 gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11" >
              <Image src={author.image} alt={`${author.name} Profile Image`} fill className="cursor-pointer rounded-full"/>
            </Link>
            <div className="thread-card_bar"></div>
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit" >
              <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`mt-5 ${isComment && 'mb-10'} flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image src="/assets/heart-gray.svg" alt="Like" width={24} height={24} className="cursor-pointer object-contain"/>
                <Link href={`/thread/${id}`}>
                  <Image src="/assets/reply.svg" alt="Reply" width={24} height={24} className="cursor-pointer object-contain"/>
                </Link>
                <Image src="/assets/repost.svg" alt="Repost" width={24} height={24} className="cursor-pointer object-contain"/>
                <Image src="/assets/share.svg" alt="Share" width={24} height={24} className="cursor-pointer object-contain"/>
              </div>

              { isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    View {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}