"use client"

import UserCard from "@/components/cards/UserCard";
import SearchBar from "@/components/shared/SearchBar";
import { usePathname, useRouter } from "next/navigation";

interface User {
  id: string,
  name: string,
  username: string,
  imgUrl?: string,
  personType: string,
  onClick?: () => void
}

export default function Search() {
  const router = useRouter()
  const pathname = usePathname()

  const result = {
    users: [
      {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        imgUrl: 'https://i.pravatar.cc/300',
        personType: 'User'
      },
      {
        id: '2',
        name: 'Mary Jane',
        username: 'maryjane',
        imgUrl: '',
        personType: 'Community'
      }
    ]
  }

  const onClickUser = (user: User) => {
    const isCommunity = user.personType === 'Community'
    router.push(`/${isCommunity ? 'community' : 'profile'}/${user.id}`)
  }

  const routeType = pathname.split('/')[1]
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <SearchBar routeType={routeType} />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            username={user.username}
            imgUrl={user.imgUrl}
            personType={user.personType}
            onClick={() => onClickUser(user)}
          />
        ))}
      </div>
    </section>
  )
}