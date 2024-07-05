
import HiringNavigation from '../components/HiringNavigation';

import { ThemeProvider } from '@/components/ui/theme-provider';
export default function HiringSheetLayout({
  children , 
} : Readonly<{children : React.ReactNode;}>){
  return (
    <>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
    <HiringNavigation/>
    {children}
    </ThemeProvider>
    </>

  )
}

