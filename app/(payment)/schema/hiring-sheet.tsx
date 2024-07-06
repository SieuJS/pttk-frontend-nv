"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import CircularProgress from "@mui/joy/CircularProgress"
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
  thoigiantao : Date ;
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
  {
    accessorKey : 'thoigiantao',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời điểm tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell : ({row}) => {
      const sheet = row.original
      return (<div className="text-400">{new Date(sheet.thoigiantao).toDateString()}</div>)
    }
  }
]

export const detailColumns : ColumnDef<HiringSheet>[] = [
  ...columns, 
  {
    id : 'detail',
    cell : ({row}) => {
      const sheet = row.original
 
      return (
       <Link href={"/hiring-sheet/infor/" +sheet.maphieudangtuyen}><Button variant={"outline"}>Chi tiết</Button></Link>
      )
    }
  }
]

export const paymentColumns : ColumnDef<HiringSheet>[] = [
  ...columns, 
  {
    id : 'detail',
    cell : ({row}) => {
      const sheet = row.original
 
      return (
       <Link href={"/payment/create/" +sheet.maphieudangtuyen}><Button variant={"outline"}>Thanh toán</Button></Link>
      )
    }
  }
]




  