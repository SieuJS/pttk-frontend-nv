'use client'
import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Checkbox, FormLabel, InputLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import Input from '@/components/ui/input'
import FormControlLabel from '@mui/material/FormControlLabel';
import { useHttpClient } from '@/shared/hooks/http-hook'
import ConfirmModal from './ConfirmModal'
import { BackEndURL } from '@/components/env/config'
import Modal from '@mui/material/Modal'
import {
    Select, MenuItem,FormControl, TextField
} from "@mui/material"
import CircularProgress from '@mui/joy/CircularProgress';



export interface FormData {
    doanhnghiep: string,
    vitridangtuyen: string,
    soluongtuyendung: string,
    khoangthoigiandangtuyen: string,
    donvithoigian: string,
    mota: string,
    thoigiandangtuyen: string,
    hinhthucdangtuyen: Array<string>;
    yeucau : {
        bangcap : string ,
        gioitinh : string,
        tuoimin : string, 
        tuoimax : string

    }

}


function CreateSheet() {
    const [durationType, setDurationType] = useState<string>('Ngày');
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    const [confirmModal, setConfirmModal] = useState<boolean>(false);
    const [tencongty , setTencongty] = useState<string>('') ;
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,

        getValues
    } = useForm<FormData>(
        {
            mode: "all",
            defaultValues: {
                doanhnghiep: "",
                vitridangtuyen: "",
                soluongtuyendung: "",
                khoangthoigiandangtuyen: "",
                donvithoigian: durationType,
                hinhthucdangtuyen: ['website'],
                mota: "",
                yeucau :{
                    tuoimax : '65',
                    tuoimin : '16',
                    bangcap : 'Không',
                    gioitinh : 'Cả hai'

                }
            }
        }
    );


    const onSubmit = handleSubmit(async (formData: FormData) => {
        try {
            let response = await sendRequest(
                BackEndURL + '/company/validate/' + formData.doanhnghiep
            )
            setTencongty(response.data.tencongty);
            setConfirmModal(true)
        }catch (err) {
            console.log(err) ;
        }
        
    })

    const leftForm = (
        <div className='left-form'>
            <div className='mb-4'>
                <Input
                    type='text'
                    label='Mã số thuế công ty'
                    id='doanhnghiep'
                    errors={errors}
                    disabled={isSubmitting}
                    register={{
                        ...register("doanhnghiep", { 
                            required: "Không được bỏ trống",
                            validate : {

                            }
                        })
                    }}
                />
            </div>
            <div className="mb-4 grid grid-cols-4 gap-2">
                <div className="col-span-3">
                    <Input
                        type='text'
                        label='Vị trí ứng tuyển'
                        id='vitridangtuyen'
                        errors={errors}
                        disabled={isSubmitting}
                        register={{
                            ...register("vitridangtuyen", { required: "Không được bỏ trống" })
                        }}
                    />
                </div>
                <div>
                    <Input
                        type='number'
                        label='Số lượng'
                        id='soluongtuyendung'
                        errors={errors}
                        disabled={isSubmitting}
                        register={{
                            ...register("soluongtuyendung", {
                                validate: {
                                    positive: v => parseInt(v) > 0 || 'Phải lớn hơn 0'
                                }
                            })
                        }}
                    />
                </div>
            </div>
        </div>
    )
    const rightForm = (
        <div className="right-form">
            <div className="mb-4">
                <Input
                    id='thoigian'
                    type='date'
                    label='Thời gian bắt đầu'
                    errors={errors}
                    disabled={isSubmitting}
                    register={
                        {
                            ...register('thoigiandangtuyen', { required: "Không được bỏ trống" })
                        }
                    }
                />
            </div>
            <div className="mb-4 grid grid-cols-5 gap-1">
                <div className="col-span-4">
                    <Input
                        id='khoangthoigiandangtuyen'
                        type='number'
                        label='Khoảng thời gian'
                        errors={errors}
                        disabled={isSubmitting}
                        register={{
                            ...register("khoangthoigiandangtuyen", { required: "Không được bỏ trống" })
                        }}
                        alignRight
                    />
                </div>
                <div className='mt-8'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'secondary'}
                            >
                                {
                                    durationType
                                }
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuLabel>
                                Chọn đơn vị
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setValue('donvithoigian', 'Ngày'); setDurationType('Ngày') }}>
                                Ngày
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setValue('donvithoigian', 'Tháng'); setDurationType('Tháng') }}>
                                Tháng
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {
                <ConfirmModal
                    open={confirmModal}
                    formData={getValues()}
                    onClose={() => { setConfirmModal(false) }}
                    tendoanhnghiep= {tencongty}
                />
            }
            <Modal
                open = {!!error}
                onClose={clearError}
                className='h-screen flex justify-center items-center'
            >
                <Card>
                    <CardHeader>
                        <h1 className="font-medium">Lỗi</h1>
                        <div className="border"></div>
                    </CardHeader>
                    <CardContent>
                        <h2 className="font-medium">{error}
                        </h2>
                    </CardContent>
                    <div className="mx-6 my-6 flex flex-row gap-6">
                            <Button className='w-100 basis-1/2' variant={'destructive'} onClick={clearError}>
                                <div className="font-medium">Xác nhận</div>
                            </Button>

                    </div>
                </Card>

            </Modal>
            <Card>
                <CardHeader>
                    <h1>Create sheet</h1>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            {leftForm}
                            {rightForm}
                        </div>
                        <div className='border my-2'>
                        </div>
                        <div>
                            <div className='grid grid-cols-1  lg:grid-cols-4 gap-4'>
                                <label
                                    htmlFor={'hinhthuc'}
                                    className="block text-sm font-medium leading-6 text-gray-900 mt-2"
                                >
                                    Hình thức đăng
                                </label>
                                <FormControlLabel control={<Checkbox
                                    defaultChecked
                                    value="website"
                                    {...register('hinhthucdangtuyen')}
                                />} label="Website" />

                                <FormControlLabel control={<Checkbox
                                    value="banner"
                                    {...register('hinhthucdangtuyen')}
                                />} label="Banner" />

                                <FormControlLabel control={<Checkbox
                                    value="bao"
                                    {...register('hinhthucdangtuyen')}
                                />} label="Báo" />
                            </div>
                            <div className='border my-2'></div>
                            <div className='grid grid-cols-1  lg:grid-cols-2 gap-4 my-4'>
                                <div className="grid grid-cols-2 gap-4">
                                <FormControl fullWidth>
                                    <InputLabel>Giới tính</InputLabel>
                                    <Select
                                        id="yeucau.gioitinh"
                                        {...register('yeucau.gioitinh', {
                                            onChange : (e)=>{
                                                setValue('yeucau.gioitinh', e.target.value)
                                            }
                                        })}
                                        label="Giới tính"
                                    >
                                        <MenuItem value="Nam">Nam</MenuItem>
                                        <MenuItem value="Nữ">Nữ</MenuItem>
                                        <MenuItem value="Cả hai">Cả hai</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel id="bangcap-label">Bằng cấp</InputLabel>
                                    <Select
                                    labelId="bangcap-label"
                                        id="yeucau.bangcap"
                                        {...register('yeucau.bangcap', {
                                            onChange : (e)=>{
                                                setValue('yeucau.bangcap', e.target.value)
                                            }
                                        })}
                                        label="Bằng cấp"
                                    >
                                        <MenuItem value="Không">Tất cả</MenuItem>
                                        <MenuItem value="Đại học">Đại học</MenuItem>
                                        <MenuItem value="THPT">Tốt nghiệp THPT</MenuItem>
                                    </Select>
                                </FormControl>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                <TextField
                                    fullWidth
                                    id="yeuCau.tuoiMin"
                                    label="Tuổi (từ)"
                                    type="number"
                                    {...register('yeucau.tuoimin')}
                                />

                                <TextField
                                    fullWidth
                                    id="yeuCau.tuoiMax"
                                    label="Tuổi (đến)"
                                    type="number"
                                    {...register('yeucau.tuoimax')}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="border mt-2 mb-2"></div>
                        <div className="mb-5">
                            <Input
                                id="mota"
                                type='text'
                                isTextArea
                                label='Thông tin yêu cầu'
                                errors={errors}
                                disabled={isSubmitting}
                                register={{
                                    ...register('mota', { required: "Không được bỏ trống" })
                                }}
                            />
                        </div>
                                
                        <div className="border mt-2 mb-2"></div>
                        <div className='mt-4'>
                            <Button disabled = {!isValid}>{isLoading ? <CircularProgress/> : "Đăng ký"}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </>

    )
}

export default CreateSheet