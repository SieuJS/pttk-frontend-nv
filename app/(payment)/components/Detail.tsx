'use client'
import { BackEndURL } from "@/components/env/config";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableHeader, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { useHttpClient } from "@/shared/hooks/http-hook";
import React, { useEffect, useState } from 'react'
import Modal  from "@mui/material/Modal";

interface DetailProps {
    maphieudangky: string;
}

function Detail({ maphieudangky }: DetailProps) {
    const { isLoading, error, clearError, sendRequest } = useHttpClient();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async (maphieudangky:string) => {
            try {
                let response = await sendRequest(
                    BackEndURL+'/hiring-sheet/get'+maphieudangky
                )
        
            }catch (err) {
                console.log(err)
            }
    
        }
        fetchData(maphieudangky) ; 

    }, [])

    return (
        <div>Detail</div>
    )
}

export default Detail