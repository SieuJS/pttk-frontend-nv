
import HiringNavigation from '../components/HiringNavigation';
export default function HiringSheetLayout({
  children , 
} : Readonly<{children : React.ReactNode;}>){
  return (
    <>
    <HiringNavigation/>
    {children}
    </>

  )
}

