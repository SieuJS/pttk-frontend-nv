'use client'
import { useRouter } from "next/router"

export default function () {
    const router = useRouter() ;
    router.push('/dashboard');
    router.reload();
}
