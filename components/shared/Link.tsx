
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';


export interface linkProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  linkTo: string;
}

const MyLink = React.forwardRef<HTMLDivElement, linkProps>(
  ({ className, linkTo, children }, ref) => {
    return (
      <Link href={linkTo} className={className}>
         {children}
      </Link>
    );
  }
);


export default MyLink;