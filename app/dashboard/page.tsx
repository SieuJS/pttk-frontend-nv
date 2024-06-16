
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
  } from "@/components/ui/table";
const DashBoard = () => {
    return (
        <>
    <Card>
        <CardHeader className="px-7">
            <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>
    </Card>
    <CardContent>
        <Table>
        <TableBody>
            <TableRow>
                <TableCell>
                <div className="font-medium">Mã Nhân Viên</div>
                </TableCell>
                <TableCell>
                <div className="font-medium">NV003</div>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                <div className="font-medium">Họ và tên</div>
                </TableCell>
                <TableCell>
                <div className="font-medium">Nguyễn Văn Siêu</div>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                <div className="font-medium">Chức vụ</div>
                </TableCell>
                <TableCell>
                <div className="font-medium">Nhân viên tiếp nhận</div>
                </TableCell>
            </TableRow>
        </TableBody>
        </Table>
    </CardContent>
    </>
    )
}

export default DashBoard;