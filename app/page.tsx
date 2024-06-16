'use client'
import Orders from "@/components/features/orders";
import {useRouter} from 'next/navigation'
import { useContext } from "react";
import { useAuthContext } from "@/components/shared/AppProvider";

import CircularProgress from '@mui/material/CircularProgress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {

  return (
    <Card>
      <CardHeader>
        Chúng tôi đang chuyển hướng bạn ...
      </CardHeader>
      <CardContent>
        <CircularProgress/>
      </CardContent>
    </Card>
  );
}
