"use client"

import { usePathname, useRouter } from "next/navigation";
import UserCard from "@/components/cards/UserCard";
import SearchBar from "@/components/shared/SearchBar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface User {
  id: string,
  name: string,
  username: string,
  imgUrl?: string,
  personType: string,
  onClick?: () => void
}

export default function Search({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const router = useRouter()
  const pathname = usePathname()
  const routeType = pathname.split('/')[1]

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
    ],
    totalPage: 5,
    isNext: true
  }

  const onClickUser = (user: User) => {
    const isCommunity = user.personType === 'Community'
    router.push(`/${isCommunity ? 'community' : 'profile'}/${user.id}`)
  }

  const currentQueryPage = Number(searchParams?.page ?? 1)

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

      {(result.isNext && result.totalPage > 1) && <Pagination className="text-light-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/search?page=${currentQueryPage - 1 > 0 ? currentQueryPage - 1 : 1}`}
              aria-disabled={!!searchParams.page && Number(searchParams?.page) > 1}
            />
          </PaginationItem>
          {result.totalPage && result.totalPage <= 5 && [...Array(result.totalPage)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`/search?page=${index + 1}`}
                isActive={currentQueryPage === index + 1}
              >
                  {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem>
            <PaginationNext
              href={`/search?page=${currentQueryPage + 1 >= Number(result.totalPage) ? result.totalPage : currentQueryPage + 1}`}
              aria-disabled={!!searchParams.page && currentQueryPage >= result.totalPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>}
    </section>
  )
}