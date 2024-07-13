'use client'
import React, { useEffect, useState } from 'react';
import { useHttpClient } from '@/shared/hooks/http-hook';
import { BackEndURL } from '@/components/env/config';
import { useParams } from 'next/navigation';
import HiringDetail from '@/app/(hiring-sheet)/components/HiringDetail';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { ApplySheet } from '@/app/(apply)/schema/apply-sheet';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import { CircularProgress, Modal } from '@mui/material';
import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form'

interface RejectForm {
    maphieuungtuyen: string;
    maungvien: string;
    lydo: string;
}

function Page() {
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const [rejectModal, setRejectModal] = useState(false);
    const router = useRouter();
    const params = useParams();
    const [sucess,setSucess] = useState(false);
    const [processModal, setProcessModal]  = useState(
        true
    )
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
        getValues
    } = useForm<RejectForm>({
        mode: 'all',
        defaultValues: {
            maphieuungtuyen: `${params.matin}`,
            maungvien: `${params.maungvien}`.replace('%40','@'),
            lydo: ''
        }
    });

    const onSubmit = handleSubmit(async (formData: RejectForm) => {
        try {
            let response = await sendRequest(BackEndURL + '/apply-sheet/action/reject',
                'POST',
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(formData)
            );
            // Handle success, e.g., close modal, update UI
            setRejectModal(false); 
            // ...
            setSucess(true)
        } catch (err) {
            console.log(err)
        }
    });

    const onApprove = async () => {
        try {
            let response = await sendRequest(BackEndURL + '/apply-sheet/action/approve',
                'POST',
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify({
                    maphieuungtuyen : params.matin,
                    maungvien : getValues().maungvien.replace('%40','@')
                })
            );

            setSucess(true)
        } catch (err) {
            console.log(err)
        }
    }

    const [data, setData] = useState<ApplySheet>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await sendRequest(BackEndURL + `/apply-sheet/get?maphieuungtuyen=${params.matin}&maungvien=${getValues().maungvien.replace('%40','@')}`);
                setData(response.data);
                
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [sucess])

    let headingProcess ; 
    let contentProcess;
    if (isLoading) {
        headingProcess = (
            <div className="text-700 font-bold">Đang tải</div>
        );
        contentProcess = (
            <CircularProgress/>
        )
    }

    if(sucess) {
        headingProcess = (
            <div className="text-700 font-bold">Thành công</div>
        );
        contentProcess = (
            <div>
                
            </div>
        )
    }



    return (
        <>
            <Modal
                open={rejectModal}
                onClose={() => setRejectModal(false)}
                className="flex items-center justify-center" 
            >
                <Card className="w-96"> {/* Adjust modal width as needed */}
                    <CardHeader className="text-center font-bold text-lg">Phiếu từ chối ứng viên</CardHeader>
                    <form onSubmit={onSubmit} className="p-4">
                        <Input
                            id='lydo'
                            isTextArea
                            label='Lý do từ chối'
                            errors={errors}
                            register={{ ...register(
                                'lydo', { required: "Không được bỏ trống lý do từ chối" }
                            ) }}
                        />
                        <div className="flex justify-end space-x-4 mt-4">
                            <Button variant={'secondary'} onClick={() => setRejectModal(false)}>Hủy</Button>
                            <Button type="submit">Từ chối</Button>
                        </div>
                    </form>
                </Card>
            </Modal>

            <Card>
                <CardHeader className="border-b-2">
                    <div className="font-bold text-lg">Mã phiếu: {params.matin}</div>
                    <Link href={'/hiring-sheet/infor/' + params.matin} className="text-blue-500 hover:text-blue-700">Chi tiết</Link>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                    <div className="font-medium">Email ứng viên:</div>
                    <div>{data?.maungvien}</div>
                    <div className="font-medium">Thời gian ứng tuyển:</div>
                    <div>{(new Date(data?.thoigianungtuyen || '')).toUTCString()}</div>
                    <div className="font-medium">Tình trạng:</div>
                    <div className={"text-gray-500"}>{data?.trangthai}</div> {/* Use a neutral color for status */}
                    <div className="font-medium">Thông tin CV:</div>
                    {data?.cv ?
                        <Link href={data?.cv || ""} target='_blank' className="text-blue-500 hover:text-blue-700">Xem CV</Link>
                        : <div className="text-red-500">Không có CV</div>
                    }
                    <div className="font-medium">Thông báo:</div>
                    <div className={"text-gray-500"} >{data?.thongbao}</div>
                    <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">
                    {
                    data?.trangthai && (data?.trangthai.toLowerCase() !== 'từ chối' && data?.trangthai.toLowerCase() !== 'đã duyệt') &&
                            <Button variant={'destructive'} onClick={() => setRejectModal(true)}
                            className='w-full'>Từ chối</Button>
                    }
                    {data?.trangthai && data?.trangthai.toLowerCase() !== 'đã duyệt' && (
                        <>
                            <Button onClick={onApprove} className='w-full'>Duyệt</Button> 
                        </>
                    )}
                    </div>

                    <Button className='w-full mt-4 col-span-2' variant={'secondary'} onClick={() => { router.replace('/apply-sheet/infor/' + params.matin) }}>
                        Quay lại
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default Page