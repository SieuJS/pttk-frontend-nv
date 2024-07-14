'use client';
import { BackEndURL } from "@/components/env/config";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useHttpClient } from "@/shared/hooks/http-hook";
import React, { useEffect, useState } from 'react';
import DoPayment from './DoPayment';
import { HoaDon } from "./DoPayment";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Table } from "@/components/ui/table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";
interface DetailProps {
  hoadon: HoaDon;
}

interface Bill {
  mahoadon : string ; 
  lanthanhtoan : string ; 
  ngaythanhtoan : string ;
  sotienthanhtoan : string ; 
  nhanvienthanhtoan : string ;  
}

function PaymentDetail({ hoadon }: DetailProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bills ,setBills ] = useState <Bill[]>() ; 
  const router = useRouter();
  const {sendRequest, isLoading, error , clearError} = useHttpClient() ;
  
  useEffect( () => {
    const fetchData = async () => {
    try { 
      let res = await sendRequest(
        BackEndURL+'/payment/bills/' + hoadon.mahoadon
      ); 
      setBills(res.data.payments) ; 
      
    }
    catch (err) {
      console.log(err)
    }
    }
    fetchData() ; 
  }, [showPaymentModal] )


  return (
    <div>
      <Card className="w-full mt-4">
        <CardHeader title="Chi Tiết Hóa Đơn" />
        <CardContent className="grid grid-cols-2 gap-4 my-4">
          {/* Form-like display using grid */}
          <div>
            <label htmlFor="mahoadon" className="block text-sm font-medium text-gray-700">
              Mã hóa đơn:
            </label>
            <p id="mahoadon" className="mt-1 text-sm text-gray-900">
              {hoadon.mahoadon}
            </p>
          </div>
          <div>
            <label htmlFor="tongtien" className="block text-sm font-medium text-gray-700">
              Tổng tiền:
            </label>
            <p id="tongtien" className="mt-1 text-sm text-gray-900">
              {hoadon.tongtien}
            </p>
          </div>
          <div>
            <label htmlFor="sodotthanhtoan" className="block text-sm font-medium text-gray-700">
              Số đợt thanh toán:
            </label>
            <p id="sodotthanhtoan" className="mt-1 text-sm text-gray-900">
              {hoadon.sodotthanhtoan}
            </p>
          </div>
          <div>
            <label htmlFor="sotienconlai" className="block text-sm font-medium text-gray-700">
              Số tiền còn lại:
            </label>
            <p id="sotienconlai" className="mt-1 text-sm text-gray-900">
              {hoadon.sotienconlai}
            </p>
          </div>
          <div>
            <label htmlFor="dotdathanhtoan" className="block text-sm font-medium text-gray-700">
              Đợt đã thanh toán:
            </label>
            <p id="dotdathanhtoan" className="mt-1 text-sm text-gray-900">
              {hoadon.dotdathanhtoan}
            </p>
          </div>
          <div className="col-span-2">
          <Table>
            <TableHead className="border">
              <TableRow>
                <TableCell>Mã hoá đơn</TableCell>
                <TableCell>Lần thanh toán</TableCell>
                <TableCell>Ngày thanh toán</TableCell>
                <TableCell>Số tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="border-x">
              {
                bills?.map( (b,i) => {
                  return (
                    <TableRow key = {i.toString()}>
                      <TableCell>{b.mahoadon}</TableCell> 
                      <TableCell>{b.lanthanhtoan}</TableCell>
                      <TableCell>{(new Date(b.ngaythanhtoan).toLocaleString())}</TableCell>
                      <TableCell>{b.sotienthanhtoan}</TableCell>
                  </TableRow>
                  )
                })
              }

            </TableBody>
          </Table>
          <div className="flex justify-center mt-4">
                { isLoading && <CircularProgress/>}
          </div>
          </div>
          <div className="col-span-2 mt-4 flex gap-4">
            <Button variant={'destructive'} onClick={router.back}>Quay lai</Button>
              {!hoadon.trangthaithanhtoan && <Button
              onClick={() => setShowPaymentModal(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Thanh toán
            </Button>}
          </div>


        </CardContent>
      </Card>

      {/* Payment Modal */}
      {showPaymentModal && (
        <DoPayment hoadon={hoadon} onClose={() => setShowPaymentModal(false)} />
      )}
    </div>
  );
}

export default PaymentDetail;