import { Tabs} from "@/components/ui/tabs"
import Link from 'next/link'
import { usePathname } from "next/navigation"

function layout() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <Link href = '/hiring-sheet/create' >Tạo phiếu</Link>
  </Tabs>

  )
}

export default layout