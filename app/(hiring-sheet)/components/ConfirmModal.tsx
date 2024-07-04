'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FormData } from './CreateSheet';
import { Company } from '@/app/schema/company';
import { useHttpClient } from '@/shared/hooks/http-hook';
import { BackEndURL } from '@/components/env/config';
import CircularProgress from '@mui/joy/CircularProgress';

interface ConfirmProps {
    open: boolean;
    formData: FormData;
    tendoanhnghiep?: string;
    onClose: (e? :any) => void;
}

interface Response {
    message : string ,
    data : any
}

const ConfirmModal: React.FC<ConfirmProps> = ({
    open,
    formData,
    onClose,
    tendoanhnghiep
}) => {
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const [stateModal, setStateModal] = useState(false);
    const [response, setResponse] = useState<Response>();
    const [isSent,setIsSend] = useState(false);
    const onSend = async () => {
        setIsSend(true);
        try {
            let res = await sendRequest(
                BackEndURL + '/hiring-sheet/create',
                'POST',
                {
                    'Content-Type': 'application/json'
                },
                JSON.stringify(formData)
            );

            setResponse(res);
        } catch (error) {

        }
    }
    
    const closeStateModalHandler = () => {
        clearError();
        onClose();
        setIsSend(false);

    }

    const mainContent = (
        <>
            <CardHeader>
                <h2 className='font-medium'>Xác nhận thông tin</h2>
                <div className="border"></div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Mã số thuế: </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{formData.doanhnghiep}</div>
                            </TableCell>
                            <TableCell className='border-l'>
                                <div className="font-medium">Tên công ty:</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{tendoanhnghiep}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Vị trí ứng tuyển </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{formData.vitridangtuyen}</div>
                            </TableCell>
                            <TableCell className='border-l'>
                                <div className="font-medium">Số lượng</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{formData.soluongtuyendung}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">
                                    Ngày đăng
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{formData.thoigiandangtuyen}</div>
                            </TableCell>
                            <TableCell className='border-l'>
                                <div className="font-medium">
                                    Thời gian
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{formData.khoangthoigiandangtuyen} {formData.donvithoigian}</div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Hình thức đăng tuyển: </div>
                            </TableCell>
                            {formData.hinhthucdangtuyen.map(ht => {
                                if (ht === 'website') {
                                    ht = 'Website'
                                }
                                else if (ht === 'banner') {
                                    ht = 'Banner'
                                }
                                else if (ht === 'bao') {
                                    ht = 'Báo'
                                }
                                return (
                                    <TableCell>
                                        <div className="font-medium">{ht}</div>
                                    </TableCell>)

                            })
                            }

                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <div className="font-medium">Yêu cầu đăng tuyển:</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Giới tính:</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{formData.yeucau.gioitinh}</div>
                            </TableCell>
                            <TableCell className='border-l'>
                                <div className="font-medium">Bằng cấp:</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{formData.yeucau.bangcap}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Độ tuổi:</div>
                            </TableCell>
                            <TableCell colSpan={3}>
                                <div className="font-medium">
                                    Từ {formData.yeucau.tuoimin} đến {formData.yeucau.tuoimax}
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Mô tả</div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className='font-medium ml-4 mb-2'>
                    {formData.mota}
                </div>
                <div className="border mt-2 mb-2"></div>
            </CardContent>
            <div className="mx-6 my-6 flex flex-row gap-6">
                        <Button className='w-100 basis-1/2' variant={'destructive'} onClick={onClose}>
                            <div className="font-medium">Huỷ bỏ</div>
                        </Button>
                        <Button className='w-100 basis-1/2' disabled = {isLoading} onClick={onSend}>{isLoading ? <CircularProgress/> : "Xác nhận"}</Button>
            </div>

        </>
    )

    const errorContent = (
        <>
            <CardHeader>
                <h1 className="font-medium">Lỗi</h1>
                <div className="border"></div>
            </CardHeader>
            <CardContent>
                <h2 className="font-medium">{error}
                </h2>
            </CardContent>
            <div className="mx-6 my-6 flex flex-row gap-6">
                <Button className='w-100 basis-1/2' variant={'destructive'} onClick={closeStateModalHandler}>
                    <div className="font-medium">Xác nhận</div>
                </Button>
            </div>
        </>
    )

    const successContent = (
        <>
            <CardHeader>
                <h1 className="font-medium">Thành công</h1>
                <div className="border"></div>
            </CardHeader>
            <CardContent>
                <h2 className="font-medium">{response?.message}
                </h2>
            </CardContent>
            <div className="mx-6 my-6 flex flex-row gap-6">
                <Button className='w-100 basis-1/2' onClick={closeStateModalHandler}>
                    <div className="font-medium">Xác nhận</div>
                </Button>
            </div>
        </>
    )




    return (
        <>

        <Modal
            open={open}
            onClose={onClose}
            className='h-screen flex justify-center items-center'
        >
            <div className=''>
                <Card className='w-100'>
                    {!isSent && mainContent}
                    {isLoading && <div className="flex justify-center items-center"><CircularProgress/></div>}
                    {
                        !isLoading && isSent && error && errorContent
                    }
                    {
                        !isLoading && isSent && !error && successContent
                    }
                </Card>
            </div>
        </Modal>
        </>
    )
}

export default ConfirmModal