'use client'
import React from 'react'
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
import { Box, duration} from '@mui/material';
import Input from '@/components/ui/input';
import { FormData } from './CreateSheet';


interface ConfirmProps {
    open: boolean;
    formData : FormData;
    durationType : string;
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ConfirmModal: React.FC<ConfirmProps> = ({
    open,
    formData,
    durationType,
    onClose
}) => {
    return (
        <Modal
            open={open}
            onClose = {onClose}
        >
            <div className='flex justify-center mt-10'>
                <Card className='w-100'>
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
                                        <div className="font-medium">{formData.masothue}</div>
                                    </TableCell>
                                    <TableCell className='border-l'>
                                        <div className="font-medium">Tên công ty:</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">Nguyễn Văn Siêu</div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">Vị trí ứng tuyển </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{formData.vitri}</div>
                                    </TableCell>
                                    <TableCell className='border-l'>
                                        <div className="font-medium">Số lượng</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{formData.soluong}</div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">
                                            Ngày đăng
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{formData.thoigian}</div>
                                    </TableCell>
                                    <TableCell className='border-l'>
                                        <div className="font-medium">
                                            Thời gian
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{formData.khoangtg} {formData.donvitg}</div>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">Hình thức đăng tuyển: </div>
                                    </TableCell>
                                    {formData.hinhthuc.map(ht => 
                                        {
                                            if (ht === 'website'){
                                                ht = 'Website'
                                            }
                                            else if (ht === 'banner'){
                                                ht = 'Banner'
                                            }
                                            else if (ht === 'bao') {
                                                ht = 'Báo'
                                            }
                                            return (                                    <TableCell>
                                                <div className="font-medium">{ht}</div>
                                            </TableCell>)
                                            
                                        })
                                    }

                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                    <div className="font-medium">Yêu cầu đăng tuyển:                                    </div>

                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                        <div className='font-medium ml-4 mb-2'>
                        {formData.ttyc}
                        </div>
                        <div className="border mt-2 mb-2"></div>
                    </CardContent>
                    <div className="mx-6 my-6 flex flex-row gap-6">
                    <Button className='w-100 basis-1/2' variant={'destructive'} onClick={onClose}>
                        <div className="font-medium">Huỷ bỏ</div>
                    </Button>
                    <Button className='w-100 basis-1/2' >
                        <div className="font-medium">Xác nhận</div>
                    </Button>
                    </div>
                </Card>
            </div>
        </Modal>
    )
}

export default ConfirmModal