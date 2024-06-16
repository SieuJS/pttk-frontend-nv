import { cookies } from "next/headers"
import ResponseSheet from "../components/ResponseSheet";

function page() {
  let cookieStore = cookies () ; 
  const sessionToken = cookieStore.get('sessionToken') ;
  return (
    <ResponseSheet token={sessionToken?.value} filter="approved"/>
  )
}

export default page