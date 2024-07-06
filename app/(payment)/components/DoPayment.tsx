'use client'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/joy/CircularProgress';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useHttpClient } from '@/shared/hooks/http-hook';
import { BackEndURL } from '@/components/env/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, Modal } from '@mui/material';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';

export interface HoaDon {
  mahoadon: string;
  tongtien: string;
  sodotthanhtoan: string;
  sotienconlai: string;
  dotdathanhtoan: string;
  trangthaithanhtoan : boolean;
}

interface ThanhToan { 
    lanthanhtoan : number ; 
    sotienthanhtoan : string ; 
    loaithanhtoan: string; 
    mahoadon : string ;
}

interface DoPaymentProps {
  hoadon?: HoaDon;
  onClose: () => void;
}

const paymentTypes = [
  { value: 'tiền mặt', label: 'Tiền mặt' },
  { value: 'ngân hàng', label: 'Chuyển khoản ngân hàng' },
];

export default function DoPayment({ hoadon, onClose }: DoPaymentProps) {
    const lanthanhtoan :number = (parseInt(hoadon?.dotdathanhtoan || '0'))+ 1;
    const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<ThanhToan>({
    defaultValues :{
        mahoadon : hoadon?.mahoadon,
        lanthanhtoan : lanthanhtoan,
        sotienthanhtoan : `${parseInt(hoadon?.tongtien || '0')/parseInt(hoadon?.sodotthanhtoan || '1')}`

    }
  });
  const {toast} = useToast()

  const { sendRequest, isLoading , error, clearError} = useHttpClient();
  const [paymentType, setPaymentType] = useState('');

  const handleChange = (event: any) => {
    setValue ('loaithanhtoan', event.target.value);
    setPaymentType(event.target.value);
  };

  const onSubmit = async (data: ThanhToan) => {
    // Implement your payment logic here
    clearError();
    try {
      const responseData = await sendRequest(
        `${BackEndURL}/payment/pay`, // Replace with your API endpoint
        'POST',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify(data)
      );

      // Handle success (e.g., show a success message, update UI)
      console.log('Payment successful:', responseData);
      toast({
        variant:'default',
        title: "Hoàn thành giao dịch",
        description: "Thanh toán thành công!",
      })
      reset();
      onClose(); // Close the modal
      router.refresh();
    } catch (err: any) {
      // Handle errors (e.g., show an error message)
      console.error('Error processing payment:', err);

      toast({
        variant:'default',
        title: "Thất bại",
        description: "Thanh toán thất bại. Vui lòng thử lại sau!",
      })
    }
  };

  return (
    <Modal open={!!hoadon} onClose={onClose}>
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px]">
        <CardHeader title="Thanh Toán Hóa Đơn " />
        <CardContent>
          {hoadon && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Table>
                <TableBody>
                  {/* Display relevant hóa đơn details here */}
                  <TableRow>
                    <TableCell>Mã hóa đơn:</TableCell>
                    <TableCell>{hoadon.mahoadon}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tổng tiền:</TableCell>
                    <TableCell>{hoadon.tongtien}</TableCell>
                    <TableCell>Số tiền còn lại:</TableCell>
                    <TableCell>{hoadon.sotienconlai}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Đợt:</TableCell>
                    <TableCell>{getValues().lanthanhtoan}</TableCell>
                  </TableRow>
                  {/* Add more rows for other hóa đơn details */}
                </TableBody>
              </Table>

              <FormControl fullWidth margin="normal" required>
                <InputLabel id="payment-type-label">Phương thức thanh toán</InputLabel>
                <Select
                  labelId="payment-type-label"
                  id="payment-type"
                  value={paymentType}
                  label="Phương thức thanh toán"
                  onChange={handleChange}
                >
                  {paymentTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

                <Input
                 id = 'sotien'
                 label='Số tiền phải thanh toán'
                 {...register('sotienthanhtoan')}
                 disabled
                 value={getValues().sotienthanhtoan}
                />
                {
                    error && 
                <div className='text-red-400'>{error}</div>
                }

              <Button type="submit" disabled={isLoading} className='mt-4'>
                {isLoading && <CircularProgress size="sm" />}
                Xác nhận thanh toán
              </Button>


            </form>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
}