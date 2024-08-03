"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";

export default function SearchBar({ routeType }: { routeType: string }) {
  const getSearchType = () => {
    switch (routeType) {
      case 'search':
        return 'Users'
      default:
        return 'Communities'
    }
  }

  const [search, setSearch] = useState('')

  return (
    <div className="searchbar">
      <Image
        src='/assets/search-gray.svg'
        alt='search'
        width={24}
        height={24}
        className='object-contain'
      />
      <Input
        id='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${ getSearchType() }`}
        className='no-focus searchbar_input'
      />
    </div>
  )
}