"use client"
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import exp from "constants";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface LoadingProps {
    open: boolean;
    isLoading?: boolean;
    isError: boolean;
    messOnError: string | null;
    messOnLoading?: string;
    messOnDone: string | null;

    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoadingModal: React.FC<LoadingProps> = ({
    open,
    isLoading,
    messOnLoading,
    messOnDone,
    isError = false,
    messOnError = '',
    onClose
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {isLoading && (
                    <CircularProgress />
                )}

                {
                    !isLoading && isError && (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Có lỗi xảy ra
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {messOnError}
                            </Typography>
                        </>
                    )
                }
                {
                    !isLoading && !isError && (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Giao tác thành công
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {messOnDone}
                            </Typography>
                        </>
                    )
                }
            </Box>
        </Modal>
    )
};

export default LoadingModal;