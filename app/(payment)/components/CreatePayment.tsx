'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox, FormLabel, InputLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/input';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useHttpClient } from '@/shared/hooks/http-hook';
import { BackEndURL } from '@/components/env/config';
import Modal from '@mui/material/Modal';
import { Select, MenuItem, FormControl, TextField } from "@mui/material";
import CircularProgress from '@mui/joy/CircularProgress';

const paymentTypes = [
  { value: 'cash', label: 'Tiền mặt' },
  { value: 'bankTransfer', label: 'Chuyển khoản ngân hàng' },
  { value: 'onlinePayment', label: 'Thanh toán trực tuyến' },
];

function CreatePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { sendRequest } = useHttpClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data : any) => {
    setIsLoading(true);
    try {
      const responseData = await sendRequest(
        `${BackEndURL}/api/payments`, // Replace with your actual endpoint
        'POST',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify(data)

      );
      setPaymentData(responseData.data);
      setModalOpen(true);
    } catch (err) {
      console.error("Lỗi khi tạo phiếu thanh toán:", err);
      // Handle error, e.g., show error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPaymentData(null);
  };

  return (
    <Card>
      <CardHeader title="Tạo Phiếu Thanh Toán" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <InputLabel htmlFor="timesOfPayment">Số lần thanh toán:</InputLabel>
            <Input
              type="number"
              id="timesOfPayment"
              {...register('timesOfPayment', { required: true, min: 1 })}
            />
            {errors.timesOfPayment && <span className="text-red-500">Số lần thanh toán là bắt buộc và phải lớn hơn 0.</span>}
          </div>

          <div>
            <InputLabel htmlFor="money">Số tiền (VND):</InputLabel>
            <Input
              type="number"
              id="money"
              {...register('money', { required: true, min: 0 })}
            />
            {errors.money && <span className="text-red-500">Số tiền là bắt buộc và phải lớn hơn hoặc bằng 0.</span>}
          </div>

          <div>
            <FormControl fullWidth>
              <InputLabel id="paymentTypeLabel">Loại thanh toán</InputLabel>
              <Select
                labelId="paymentTypeLabel"
                id="paymentType"
                {...register('paymentType', { required: true })}
              >
                {paymentTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.paymentType && <span className="text-red-500">Vui lòng chọn loại thanh toán.</span>}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size="sm" /> : "Tạo Phiếu"}
          </Button>
        </form>

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold mb-4">Thông tin thanh toán</h2>
            {paymentData && (
              <pre>{JSON.stringify(paymentData, null, 2)}</pre>
            )}
            <Button onClick={handleCloseModal}>Đóng</Button>
          </div>
        </Modal>
      </CardContent>
    </Card>
  );
}

export default CreatePayment;