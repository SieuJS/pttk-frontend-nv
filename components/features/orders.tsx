import { Badge } from "@/components/ui/badge";
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

export default function Orders() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Phiếu đăng ký</CardTitle>
        <CardDescription>Phiếu đăng ký thành viên</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã phiếu</TableHead>
              <TableHead className="hidden sm:table-cell">Mã số thuế</TableHead>
              <TableHead className="hidden sm:table-cell">Tên công ty</TableHead>
              <TableHead className="hidden md:table-cell">Ngày đăng</TableHead>
              <TableHead className="text-right">Tình trạng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-accent">
              <TableCell>
                <div className="font-medium">PX123</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">21231</TableCell>
              <TableCell className="hidden sm:table-cell">
              <div className="font-medium">FPT</div>

              </TableCell>
              <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
              <TableCell className="text-right">
              <Badge className="text-xs" variant="secondary">
                  Fulfilled
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
