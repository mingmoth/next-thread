"use client"

import SearchBar from "@/components/shared/SearchBar";
import { usePathname, useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter()
  const pathname = usePathname()

  const routeType = pathname.split('/')[1]
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <SearchBar routeType={routeType} />
    </section>
  )
}