'use client'
import Link from "next/link";
import {
    Bell,
    CircleUser,
    Home,
    Menu,
    Package2,
    ShoppingCart,
    BookUser,
    FileSpreadsheet
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useAuthContext } from "./AppProvider";

import { InternalLinks } from "@/app/constants/Paths";
export const NavLinks= (
    <>
                <Link href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Home className="h-4 w-4" />
                Thông tin cá nhân
            </Link>
            <Link href="/regis-sheet"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <FileSpreadsheet className="h-4 w-4" />
                Phiếu đăng ký thành viên
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                </Badge>
            </Link>
            <Link href = '/hiring-sheet/infor' className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <BookUser className="h-4 w-4"/>
                Phiếu đăng tuyển
            </Link>
            <Link href = '/payment/infor' className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <BookUser className="h-4 w-4"/>
                Thanh toán
            </Link>
            <Link href = '/apply-sheet/infor' className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <BookUser className="h-4 w-4"/>
                Phiếu ứng tuyển
            </Link>

    </>
)
function Sidebar() {
    const auth = useAuthContext() ; 
    let sideBarLinks = auth.isLoggedIn ? (
        <>
            {NavLinks}
        </>
    ) : (
        <Link href="/signin"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Home className="h-4 w-4" />
            Đăng nhập
        </Link>
    )
    return (
        <>
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="">Công ty ABC</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {sideBarLinks}
                        </nav>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Sidebar
