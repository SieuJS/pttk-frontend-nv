'use client'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
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
import { useRouter } from 'next/navigation';

interface PaymentSheet {
  solan: string;
  sotien: string;
  loaithanhtoan: string;
}

interface CreatePaymentProps {
  maphieudangtuyen: string;
}

const SolanValues = ['1', '2', '3'];

const CreatePayment = ({ maphieudangtuyen }: CreatePaymentProps) => {
  const [price, setPrice] = useState<number>(0);
  const [modal, setModal] = useState<boolean> (false)
  const [splitPrice, setSplitPrice] = useState<number>(0);
  const { sendRequest, error, isLoading, clearError } = useHttpClient();
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    getValues
  } = useForm<PaymentSheet>(
    {
      mode: "all",
      defaultValues: {
        solan: "",
        sotien: "",
        loaithanhtoan: "tiền mặt"
      }
    }
  )

  const onSubmit = handleSubmit( async () => {
    
    let response ; 
    try {
      setModal(true);
      response = await sendRequest(BackEndURL+'/payment/create',
        'POST',
        {
          'Content-Type': 'application/json'
        }, JSON.stringify({maphieudangtuyen, sodotthanhtoan: getValues().solan})
      )
      
    }
    catch (err){
      console.log(error)
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await sendRequest(
          BackEndURL + '/hiring-sheet/price/' + maphieudangtuyen);
        setPrice(parseInt(response.data.total))
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])

  return <>
    <div>
      <Modal
        onClose={() => {setModal(false)}}
        open = {modal}

      >
        <Card className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px]'>
          <CardHeader>
            {isLoading ? 'Đang xử lý' : !!error ? 'Lỗi' : 'Hoàn thành'}
          </CardHeader>
          <CardContent>
            {isLoading ? <CircularProgress/> : !!error ? error : 'Thành công, bạn có muốn thanh toán cho hoá đơn này luôn không ?'}
          </CardContent>
          <div>
            {
              isLoading ? undefined : !!error ? (
                <Button variant={'secondary'} onClick = {()=> {
                  setModal(false);
                  clearError();
                }}>Xác nhận</Button>
              ) : (<>
                <div className="w-100 flex gap-4 my-4 mx-4">
                  <Button variant={'destructive'} onClick={router.back}>Quay về</Button>
                  <Button onClick={router.refresh}>Thanh toán</Button>
                </div>
              </>) 
            }
          </div>
        </Card>
      </Modal>
      <form onSubmit={onSubmit} className='mt-3'>
        <div className="grid grid-cols-2 gap-4">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="solan-label">Số lần thanh toán</InputLabel>
            <Select
              labelId="solan-label"
              id="solan"
              label="Số lần thanh toán"
              {...register('solan', {
                onChange: (e) => {
                  let num = e.target.value;
                  setValue('solan', e.target.value)
                  let split = price / parseInt(num);
                  setSplitPrice(split)
                }
              })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {SolanValues.map(v => (
                <MenuItem key={v} value={v} >{v}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Số lần thanh toán được chia</FormHelperText>
          </FormControl>
          <div>
            <div className="text-300 mt-2 grid grid-cols-2">
              <div>
                Số tiền:
              </div>

              <div className='font-bold'> {isLoading ? <CircularProgress className="h-4 w-4" /> : price}</div>
            </div>

            <div className="text-300 mt-2 grid grid-cols-2">
              <div>
                Số tiền mỗi đợt:
              </div>

              <div className='font-bold'> {splitPrice}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border-t-2">

          <Button>Tạo hoá đơn</Button>
        </div>
      </form>
    </div>
  </>
}


export default CreatePayment;