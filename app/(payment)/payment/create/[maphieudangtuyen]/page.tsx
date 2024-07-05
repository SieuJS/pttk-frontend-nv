
import CreatePayment from "@/app/(payment)/components/CreatePayment";
interface DynamicProps {
    params : {
        maphieudangtuyen : string ;
    }
}


const getData = async (maphieudangky : string) => {

}

export default function page ({params} : DynamicProps) {
    return (
        <>
        <h1>{params.maphieudangtuyen}</h1>
        <CreatePayment/>
        </>
    )
}