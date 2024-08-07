'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

interface LinkProps {
    href : string ;
    label : string ;
}

const HiringPath : Array<LinkProps> = [
    {
        href : '/create',
        label : 'Tạo phiếu'
    },
    {
        href : '/infor',
        label : 'Thông tin phiếu'
    }
]

const HiringNavigation = () => {
    const base = '/hiring-sheet'
    const path = usePathname();
    const styleBase = 'bg-white inline-block py-2 px-4 text-500 hover:text-800 font-semibold'
    const styleActive = 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-700 font-semibold'
    return (
        <>
            <ul className="flex border-b">
                {
                    HiringPath.map((p, i) => {
                        let link;
                        let trueLink = path.includes(p.href);
                        return (
                            <li className="-mb-px mr-1 text-muted-foreground" key = {i}>
                                <Link href={base + p.href} className={trueLink ? styleActive : styleBase}>
                                    {p.label}
                                </Link>
                            </li>
                        )

                    })
                }

            </ul>

        </>
    )
}

export default HiringNavigation;