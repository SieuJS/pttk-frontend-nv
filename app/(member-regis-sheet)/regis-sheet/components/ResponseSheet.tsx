'use client'

import React, { useEffect, useState } from 'react'
import { useHttpClient } from '@/shared/hooks/http-hook'
import envConfig from '@/config'
import SheetItem from './SheetItem'
import { SheetItemProps } from './SheetItem'

import { Box, Button, CircularProgress, Modal } from '@mui/material'
import { Card, CardFooter, CardHeader, CardContent } from '@/components/ui/card'
import SheetDetail from './SheetDetail'
import { useAuthContext } from '@/components/shared/AppProvider'

import LoadingModal from '@/components/modal/LoadingModal'
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export interface ResponseSheetProps {
    token: string | undefined,
    filter: string
}

function ResponseSheet({ token, filter }: ResponseSheetProps) {
    const { sendRequest, isLoading, error, clearError } = useHttpClient()
    const [data, setData] = useState<Array<any>>([]);
    const [detail, setDetail] = useState<any>();
    const [openDetail, setOpenDetail] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);
    const [openTrans, setOpenTrans] = useState(false)
    const [messmage, setMessage] = useState<string|null>('');
    const auth = useAuthContext() ;
    useEffect(() => {
        if (!auth.isLoggedIn) return ; 
        const fetchSheet = async () => {

            let res = await sendRequest(
                `${envConfig.BACKEND_API}/regis-sheet/get-${filter}?page=1&limit=10`,
                'GET', {
                'Authorization': `Bearer ${auth.token}`
            }
            )

            if (!!res) {
                setData(res?.data.sheets)
                setMessage(res?.message)
            }
        }
        fetchSheet();
    }, [auth.isLoggedIn])
    const onDetailHandler = (index: any) => {
        setOpenDetail(true)
        setDetail(data[index]);
    }

    const sheetAction = async (maphieu: any, action: any) => {
        setOpenTrans(true)
        let res = await sendRequest(
            `${envConfig.BACKEND_API}/regis-sheet/${action}/${maphieu}`,
            'POST', {
            'Authorization': `Bearer ${token}`
        }
        )
        if (!!res) {
            setMessage(res?.message)
        }
    }

    const determineAction = () => {
        if (filter === 'unreceived') {
            return (
                <Button onClick={() => { sheetAction(detail.maphieudangky, 'receive'); setOpenLoading(true) }}>Tiếp nhận</Button>

            )
        }
        else if (filter === 'unapproved') {
            return (
                <Button onClick={() => { sheetAction(detail.maphieudangky, 'approve'); setOpenLoading(true) }}>Duyệt</Button>
            )
        }
        return (
            <Button onClick={() => setOpenDetail(false)}>Đóng</Button>
        )
    }

    const closeTransHandler = () => {
        setOpenTrans(false) ; 
        if (error) {
            clearError() ; 
        }
        else {
            let newData = data.filter((sheet) => sheet.maphieudangky !== detail.maphieudangky)
            
            setData(newData);
            setOpenDetail(false)
        }
    }


    return (
        <>
        {!openLoading && isLoading && 
             (

                <Modal open = {!!isLoading}>
                    <Box className = "flex justify-center" sx = {style} >
                    <CircularProgress/>
                    </Box>
                </Modal>

             )
        }

        {
            openTrans && 
            <LoadingModal
                onClose={closeTransHandler}
                open = {openTrans}
                messOnDone={messmage}
                isError = {!!error}
                messOnError= {error}
                isLoading = {isLoading}
            />

        }


            <Modal
                open={openDetail}
                onClose={() => { setOpenDetail(false) }}
            >
                <Box sx={style}>

                    <Card>
                        <CardHeader>
                            Chi tiết phiếu {detail?.maphieudangky}
                        </CardHeader>
                        <CardContent>
                            <SheetDetail sheet={detail} />
                        </CardContent>
                        <CardFooter>
                            {determineAction()}
                        </CardFooter>
                    </Card>
                </Box>
            </Modal>
            <SheetItem sheets={data} onDetail={onDetailHandler} />
        </>
    )
}

export default ResponseSheet