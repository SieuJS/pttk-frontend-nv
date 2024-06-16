import React from 'react'
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';


export interface SheetItemProps {
    sheets : Array<any>,
    onDetail :   any,
} 

function determineFullfiled (sheet : any) {
    if (!sheet.ngayxetduyet) return 'Chưa xét duyệt';
    if(!sheet.nhanvientiepnhan) return 'Chưa tiếp nhận';
    return 'Đã xét duyệt';
}

function SheetItem({sheets, onDetail }: SheetItemProps) {
    
    return (
        <>
       {sheets.map((sheet,index) => (
            <TableRow className="bg-accent">
            <TableCell>
              <div className="font-medium">{sheet.maphieudangky}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{sheet.masothue}</TableCell>
            <TableCell className="hidden sm:table-cell">
            <div className="font-medium">{sheet.tencongty}</div>

            </TableCell>
            <TableCell className="hidden md:table-cell">{new Date(sheet.ngaydangky).toISOString().slice(0, 10)}</TableCell>
            <TableCell className="hidden md:table-cell"><Badge className="text-xs" variant="secondary">{determineFullfiled(sheet)}</Badge>
            </TableCell>
            <TableCell >

            <div className='text-right'><Button onClick={() => {onDetail(index)}} variant={'outline'} >Chi tiết</Button></div>
            </TableCell>
          </TableRow>
       ))}
       </>
    )
}

export default SheetItem