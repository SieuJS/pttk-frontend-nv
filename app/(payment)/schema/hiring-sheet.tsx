"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HiringSheet = {
  doanhnghiep: string;
  maphieudangtuyen : string ;
  vitridangtuyen : string ;
}


export const columns: ColumnDef<HiringSheet>[] = [
  {
    accessorKey: "maphieudangtuyen",
    header: "Mã phiếu",
  },
  {
    accessorKey: "doanhnghiep",
    header: "Mã số thuế",
  },
  {
    accessorKey: "vitridangtuyen",
    header: "Vị trí tuyển dụng",
  },
]

export const detailColumns : ColumnDef<HiringSheet>[] = [
  ...columns, 
  {
    id : 'detail',
    cell : ({row}) => {
      const sheet = row.original
 
      return (
       <Link href={"/payment/create/" +sheet.maphieudangtuyen}><Button variant={"outline"}>Chi tiết</Button></Link>
      )
    }
  }
]




  