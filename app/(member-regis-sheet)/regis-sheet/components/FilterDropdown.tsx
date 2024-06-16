'use client'
import React, {  useEffect, useState } from 'react'

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
import { filterValue } from '../../constant/filter';


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
  useEffect(() => {
    const currentFilter = filters.find((filter: filterValue) => {
      if (curPath.includes(filter.name)) {
        return filter;
      }
    })
    setFilter(currentFilter?.lable);
    setPathname(curPath);
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" >
          {filter}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Lọc phiếu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Chưa tiếp nhận</DropdownMenuItem>
        <DropdownMenuItem>Chưa duyệt</DropdownMenuItem>
        <DropdownMenuItem>Đã duyệt</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterDropdown