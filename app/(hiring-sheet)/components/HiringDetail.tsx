"use client"


import React , {useEffect, useState} from 'react'
import { CardHeader, CardContent } from '@/components/ui/card'
import { Table,TableBody,TableCell,TableRow } from '@/components/ui/table'
import { useHttpClient } from '@/shared/hooks/http-hook'
import { FormData } from './CreateSheet'
import { BackEndURL } from '@/components/env/config'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface DetailProps {
    maphieudangtuyen: string;
}

function HiringDetail({ maphieudangtuyen }: DetailProps) {
    
    const [data, setData] = useState<FormData>() ;
    const {sendRequest, isLoading, error, clearError} = useHttpClient() ;
    console.log(maphieudangtuyen)
    useEffect(() => {
        const fetchData = async() => {
            try {
                let response ;
                response = await sendRequest(
                    BackEndURL+'/hiring-sheet/get/'+maphieudangtuyen
                )
                setData(response.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData() ;
    }, [maphieudangtuyen])

  return (
    <>
                <CardHeader>
                <h2 className='font-medium'>Thông tin phiếu {maphieudangtuyen}</h2>
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
                                <div className="font-medium">{data?.doanhnghiep}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Vị trí ứng tuyển </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{data?.vitridangtuyen}</div>
                            </TableCell>
                            <TableCell className='border-l'>
                                <div className="font-medium">Số lượng</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{data?.soluongtuyendung}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">
                                    Ngày đăng
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">
      
                                    {data && new Date(data.thoigiandangtuyen).toDateString()}</div>
                            </TableCell>
                            <TableCell className='border-l'>
                                <div className="font-medium">
                                    Thời gian
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{data?.khoangthoigiandangtuyen} {data?.donvithoigian}</div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Hình thức đăng tuyển: </div>
                            </TableCell>
                            {data?.hinhthucdangtuyen.map((ht,i) => {
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
                                    <TableCell key = {i}>
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
                                <div className="font-medium">{data?.yeucau?.gioitinh}</div>
                            </TableCell>
                            <TableCell className='border-l'>
                                <div className="font-medium">Bằng cấp:</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{data?.yeucau?.bangcap}</div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="font-medium">Độ tuổi:</div>
                            </TableCell>
                            <TableCell colSpan={3}>
                                <div className="font-medium">
                                    Từ {data?.yeucau?.tuoimin} đến {data?.yeucau?.tuoimax}
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
                    {data?.mota}
                </div>
                <div className="border mt-2 mb-2"></div>
            </CardContent>
            <div className="mx-6 my-6 flex flex-row gap-6">
                        <Button className='w-100 basis-1/2' variant={'destructive'} >
                            <Link href={'/hiring-sheet/infor'}><div className="font-medium">Quay lại</div></Link>
                        </Button>
                        <Button className='w-100 basis-1/2' >  Chỉnh sửa</Button>
            </div>               
        </>
  )
}

export default HiringDetail