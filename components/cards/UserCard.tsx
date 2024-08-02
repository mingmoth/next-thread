import Image from "next/image";
import { Button } from "../ui/button";

interface UserCardProps {
  id: string,
  name: string,
  username: string,
  imgUrl?: string,
  personType: string,
  onClick: () => void
}
export default function UserCard({
  id,
  name,
  username,
  imgUrl,
  personType,
  onClick,
}: UserCardProps) {

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl || "/assets/user.svg"}
            alt="avatar"
            fill
            className="rounded-full object-cover shadow-2xl"
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold text-light-1'>{name}</h4>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

      <Button
        className='user-card_btn'
        onClick={onClick}
      >
        View
      </Button>
    </article>
  )
}