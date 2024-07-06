'use client';
import { BackEndURL } from "@/components/env/config";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useHttpClient } from "@/shared/hooks/http-hook";
import React, { useEffect, useState } from 'react';
import DoPayment from './DoPayment';
import { HoaDon } from "./DoPayment";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DetailProps {
  hoadon: HoaDon;
}

function PaymentDetail({ hoadon }: DetailProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const router = useRouter();
  return (
    <div>
      <Card className="w-full">
        <CardHeader title="Chi Tiết Hóa Đơn" />
        <CardContent className="grid grid-cols-2 gap-4">
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