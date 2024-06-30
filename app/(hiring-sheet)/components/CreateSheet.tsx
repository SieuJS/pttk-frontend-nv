'use-client'
import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Checkbox, FormLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import Input from '@/components/ui/input'
import FormControlLabel from '@mui/material/FormControlLabel';
import { useHttpClient } from '@/shared/hooks/http-hook'
import ConfirmModal from './ConfirmModal'

export interface FormData {
    masothue: string,
    vitri: string,
    soluong: string,
    khoangtg: string,
    donvitg: string,
    ttyc: string,
    thoigian: string,
    hinhthuc: Array<string>,
}


function CreateSheet() {
    const [durationType, setDurationType] = useState<string>('Ngày');
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [confirmModal, setConfirmModal] = useState<boolean>(false);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        
        reset,
        
        getValues
    } = useForm<FormData>(
        {
            mode : "all",
            defaultValues: {
                masothue: "",
                vitri: "",
                soluong: "",
                khoangtg: "",
                donvitg : durationType,
                hinhthuc: ['website'],
                ttyc : "",
                
            }
        }
    );
    const onSubmit = handleSubmit (async (formData : FormData) => {
        let data; 
    })

    const leftForm = (
        <div className='left-form'>
            <div className='mb-4'>
                <Input
                    type='text'
                    label='Mã số thuế công ty'
                    id='masothue'
                    errors={errors}
                    disabled={isSubmitting}
                    register={{
                        ...register("masothue", { required: "Không được bỏ trống" })
                    }}
                />
            </div>
            <div className="mb-4 grid grid-cols-4 gap-2">
                <div className="col-span-3">
                    <Input
                        type='text'
                        label='Vị trí ứng tuyển'
                        id='vitri'
                        errors={errors}
                        disabled={isSubmitting}
                        register={{
                            ...register("vitri", { required: "Không được bỏ trống" })
                        }}
                    />
                </div>
                <div>
                    <Input
                        type='number'
                        label='Số lượng'
                        id='soluong'
                        errors={errors}
                        disabled={isSubmitting}
                        register={{
                            ...register("soluong",{
                                validate: {
                                  positive: v => parseInt(v) > 0 || 'Phải lớn hơn 0'}})
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
                            ...register('thoigian', { required: "Không được bỏ trống" })
                        }
                    }
                />
            </div>
            <div className="mb-4 grid grid-cols-5 gap-1">
                <div className="col-span-4">
                    <Input
                        id='khoangtg'
                        type='number'
                        label='Khoảng thời gian'
                        errors={errors}
                        disabled={isSubmitting}
                        register={{
                            ...register("khoangtg", { required: "Không được bỏ trống" })
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
                            <DropdownMenuItem onClick={() =>{setValue('donvitg','Ngày'); setDurationType('Ngày')}}>
                                Ngày
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {setValue('donvitg','Tháng'); setDurationType('Tháng')}}>
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
                open = {confirmModal }
                formData={getValues()}
                onClose={() => {setConfirmModal(false)}}
                durationType= {durationType}
            />
        }
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
                        <div className='border mt-2 mb-2'>

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
                                    {...register('hinhthuc')}
                                />} label="Website" />

                                <FormControlLabel control={<Checkbox
                                    value="banner"
                                    {...register('hinhthuc')}
                                />} label="Banner" />

                                <FormControlLabel control={<Checkbox
                                    value="bao"
                                    {...register('hinhthuc')}
                                />} label="Báo" />
                            </div>
                        </div>
                        <div className="border mt-2 mb-2"></div>
                        <div className="mb-5">
                        <Input
                            id = "ttyc"
                            type='text'
                            isTextArea
                            label='Thông tin yêu cầu'
                            errors={errors}
                            disabled = {isSubmitting}
                            register={{
                                ...register('ttyc',{required : "Không được bỏ trống"})
                            }}
                            />
                        </div>
                        <div className="border mt-2 mb-2"></div>
                        <div className='mt-4'>
                        <Button onClick={()=> isValid?  setConfirmModal(true) : "" }>Lập phiếu</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </>

    )
}

export default CreateSheet