import { TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";


function page() {
  return (
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
  )
}

export default page