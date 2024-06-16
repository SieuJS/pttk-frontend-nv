import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";

import FilterDropdown from "../components/FilterDropdown";

import { Pagination, Stack } from
 "@mui/material";

export default function RegisSheetLayout({
    children , 
} : Readonly<{children : React.ReactNode;}>) {
  return (
    <Card>
      <CardHeader className="px-7 flex-row justify-between">
        <div className="flex-col">
        <CardTitle>Phiếu đăng ký</CardTitle>
        <CardDescription>Phiếu đăng ký thành viên</CardDescription>
        </div>
        <FilterDropdown/>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã phiếu</TableHead>
              <TableHead className="hidden sm:table-cell">Mã số thuế</TableHead>
              <TableHead className="hidden sm:table-cell">Tên công ty</TableHead>
              <TableHead className="hidden md:table-cell">Ngày đăng</TableHead>
              <TableHead className="hidden md:table-cell">Tình trạng</TableHead>
              <TableHead className="text-right">Chi tiết</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {children}
          </TableBody>
        </Table>
        <Card className="flex justify-center">
        <Stack>
        <Pagination count={10} />
        </Stack>
        </Card>
      </CardContent>
    </Card>
  );
}
