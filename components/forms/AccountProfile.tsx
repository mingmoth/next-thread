"use client"

interface Props {
  user: {
    id: string,
    objectId: string,
    username: string,
    name: string,
    bio: string,
    image: string
  }
  btnTitle: string
}

export default function AccountProfile({ user, btnTitle }: Props) {
  return (
    <div className="text-light-1">AccountProfile</div>
  )
}