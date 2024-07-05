'use client'
import React,{useState} from 'react';
import {useForm} from 'react-hook-form'
import Input from '@/components/ui/input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const paymentTypes = [
  { value: 'tiền mặt', label: 'Tiền mặt' },
  { value: 'ngân hàng', label: 'Chuyển khoản ngân hàng' }
];

interface PaymentSheet {
  solan : string ;
  sotien : string ;
  loaithanhtoan : string ;
}

const SolanValues = ['1' , '2', '3'] ; 

const CreatePayment = () => {


  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    getValues
} = useForm<PaymentSheet> (
  {
    mode : "all" ,
    defaultValues : {
      solan : "" , 
      sotien : "",
      loaithanhtoan : "tiền mặt"
    }
  }
)

  const onSubmit = handleSubmit (() => {
    console.log('on submit')
  })
  
  
  return <>
      <div>
      <form onSubmit={onSubmit}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="solan-label">Số lần thanh toán</InputLabel>
        <Select
          labelId="solan-label"
          id="solan"
          label="Số lần thanh toán"
          {...register('solan', {
            onChange : (e) => {
              setValue('solan', e.target.value)
            }
          })}
        >
          <MenuItem value = "">
            <em>None</em>
          </MenuItem>
          {SolanValues.map(v => (
            <MenuItem key={v} value = {v} >{v}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Số lần thanh toán được chia</FormHelperText>
      </FormControl>
      </form>
    </div>
  </>
}


export default CreatePayment;