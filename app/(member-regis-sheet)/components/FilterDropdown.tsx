'use client'
import React, {  useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button";

import { usePathname, useSearchParams } from 'next/navigation';
import { filterValue } from '../constant/filter';
import Link from 'next/link'
const filters : filterValue[]  = [
  {
    name: 'unreceived',
    lable: 'Chưa tiếp nhận'
  }
  ,
  {
    name: 'unapproved',
    lable: 'Chưa duyệt'
  },
  {
    name: 'approved',
    lable: 'Đã duyệt'
  }
]

function FilterDropdown() {
  const [pathname, setPathname] = useState<string | undefined>('');
  const [filter, setFilter] = useState<string | undefined>('');
  let curPath = usePathname()
  const searchParams = useSearchParams();
  const router = useRouter() ;
  console.log('reload')
  useEffect(() => {
    const currentFilter = filters.find((filter: filterValue) => {
      if (curPath.includes(filter.name)) {
        return filter;
      }
    })
    if (!currentFilter){
      router.replace('/regis-sheet/unreceived')
    }
    setFilter(currentFilter? currentFilter.lable : 'Chưa tiếp nhận');
    setPathname(currentFilter ? curPath : '/unreceived');
  }, [curPath]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" >
          {filter}
        <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Lọc phiếu
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/regis-sheet/unreceived`}>
          Chưa tiếp nhận
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/regis-sheet/unapproved`}>
            Chưa duyệt
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/regis-sheet/approved`}>
            Đã duyệt
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterDropdown