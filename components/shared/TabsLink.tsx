'use client'
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export interface LinkProps {
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

interface TabLinkProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    links : Array<LinkProps>;
    baseURL : string;

}

const TabLinks = React.forwardRef<HTMLDivElement, TabLinkProps> (({links, baseURL}) => {
    const base = baseURL
    const path = usePathname();
    const styleBase = 'bg-white inline-block py-2 px-4 text-500 hover:text-800 font-semibold'
    const styleActive = 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-700 font-semibold'
    return (
        <>
            <ul className="flex border-b">
                {
                    links.map((p) => {
                        let link;
                        let trueLink = path.includes(p.href);
                        return (
                            <li className="-mb-px mr-1">
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
})

export default TabLinks;