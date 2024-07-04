
import TabLinks from '@/components/shared/TabsLink'
import { LinkProps } from '@/components/shared/TabsLink';

const PaymentLinks : Array<LinkProps> = [
    {
        href : '/infor',
        label : 'Phiếu đăng tuyển' 
    },
    {
        href : '/create',
        label : 'Thanh toán'
    }

]

export default function HiringSheetLayout({
  children , 
} : Readonly<{children : React.ReactNode;}>){
  return (
    <>
    <TabLinks links = {PaymentLinks} baseURL='/payment' />
    {children}
    </>

  )
}

