
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import CreatePayment from "@/app/(payment)/components/CreatePayment";
import { Eye } from "lucide-react";
import { BackEndURL } from "@/components/env/config";
import DoPayment from "@/app/(payment)/components/DoPayment";
import { HoaDon } from "@/app/(payment)/components/DoPayment";
import Payment from "@/app/(payment)/components/PaymentDetail";
import PaymentDetail from "@/app/(payment)/components/PaymentDetail";
interface DynamicProps {
    params : {
        maphieudangtuyen : string ;
    }
}


const getData = async (maphieudangky : string) => {
    try {
        let res = await fetch (BackEndURL+'/payment/getbyhiring/'+maphieudangky, {cache : 'no-store'});
        if (!res.ok) throw new Error('fail')
        let afterRes = await res.json();
        return afterRes.data;
    }
    catch (err) {
        console.log(err)
        return undefined

    }
}

export default async function page ({params} : DynamicProps) {
    const maphieudangtuyen = params.maphieudangtuyen;
    const hoadon : HoaDon = await getData(maphieudangtuyen);
    let content ;
    if (!hoadon) {
        content = (
        <CreatePayment maphieudangtuyen={maphieudangtuyen}/>
        )
    }
    else {
        content = (
            <PaymentDetail hoadon={hoadon}/>
        )
    }
    return (
        <>
        <Card>
        <CardHeader className="border-b">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
        <h1 className="font-bold">{params.maphieudangtuyen}</h1>
        <CardDescription ><Link href = {'/hiring-sheet/infor/'+maphieudangtuyen} className="flex items-center gap-1"><Eye className="h-4 w-4"/> Chi tiết phiếu</Link></CardDescription>
        </div>
        </CardHeader>
        <CardContent>
            {content}
        </CardContent>
        </Card>
        </>
    )
}