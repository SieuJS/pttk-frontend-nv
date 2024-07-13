"use client" 
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

export type Post = {
    matin: string;
    congty : string;
    diachi: string;
    ngaydang : string ;
    vitri : string;

}

export const PostColumns : ColumnDef <Post>[] =[
    {
        accessorKey : 'matin',
        header : 'Mã tin'
    },
    {
        accessorKey : 'congty',
        header : 'Tên công ty'
    },
    {
        accessorKey : 'diachi',
        header : 'Địa chỉ'
    },
    {
        accessorKey : 'vitri',
        header : 'Vị trí tuyển'
    },
    {
        accessorKey : 'ngaydang',
        header: ({ column })=> {
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
            return (<div className="text-400">{new Date(sheet.ngaydang).toDateString()}</div>)
        }
    },
    {
        id : 'detail',
        cell : ({row}) => {
          const sheet = row.original
     
          return (
           <Link href={"/apply-sheet/infor/" +sheet.matin}><Button variant={"outline"}>DS ứng tuyển</Button></Link>
          )
        }
      }
]