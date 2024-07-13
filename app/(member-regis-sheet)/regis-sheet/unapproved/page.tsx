import { cookies } from "next/headers"
import ResponseSheet from "../components/ResponseSheet";

function Page() {
  let cookieStore = cookies () ; 
  const sessionToken = cookieStore.get('sessionToken') ;
  return (
    <ResponseSheet token={sessionToken?.value} filter="unapproved"/>
  )
}

export default Page