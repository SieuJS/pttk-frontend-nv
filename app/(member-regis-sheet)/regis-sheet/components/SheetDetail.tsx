import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

function SheetDetail({sheet} : any) {
  return (
    <Table>
    <TableBody>
        <TableRow>
            <TableCell>
            <div className="font-medium">Mã Phiếu</div>
            </TableCell>
            <TableCell>
            <div className="font-medium">{sheet.maphieudangky}</div>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>
            <div className="font-medium">Mã số thuế</div>
            </TableCell>
            <TableCell>
            <div className="font-medium">{sheet.masothue}</div>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>
            <div className="font-medium">Tên công ty</div>
            </TableCell>
            <TableCell>
            <div className="font-medium">{sheet.tencongty}</div>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>
            <div className="font-medium">Người đại diện</div>
            </TableCell>
            <TableCell>
            <div className="font-medium">{sheet.nguoidaidien}</div>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>
            <div className="font-medium">Địa chỉ</div>
            </TableCell>
            <TableCell>
            <div className="font-medium">{sheet.diachi}</div>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>
            <div className="font-medium">Email</div>
            </TableCell>
            <TableCell>
            <div className="font-medium">{sheet.email}</div>
            </TableCell>
        </TableRow>
    </TableBody>
    </Table>
  )
}

export default SheetDetail