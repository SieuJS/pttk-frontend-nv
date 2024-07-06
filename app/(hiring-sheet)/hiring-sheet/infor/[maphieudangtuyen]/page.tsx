import HiringDetail from "@/app/(hiring-sheet)/components/HiringDetail";


interface DynamicProps {
    params : {
        maphieudangtuyen : string ;
    }
}




export default function page ({params} : DynamicProps) {
    return (
        <>
        <HiringDetail maphieudangtuyen={params.maphieudangtuyen}/>
        </>
    )
}