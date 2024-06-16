"use client"
import {useForm} from "react-hook-form"
import Input from "@/components/ui/input";

import LoadingModal from "@/components/modal/LoadingModal";
import { useRouter } from 'next/navigation'
import {
    FormData, setCookie
} from "@/app/(auth)/actions/loginAction"
import { useState, useContext } from "react";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { AuthResponse } from "@/shared/schema/AuthReponse";
import { UserData } from "@/shared/hooks/auth-hook";
import envConfig from "@/config";

import { useAuthContext } from "@/components/shared/AppProvider";

const LoginForm = () => {
    const router = useRouter();
    const {
        register,
        setValue,
        handleSubmit, 
        formState : {errors, isSubmitting},
        reset,
    } = useForm<FormData>({
        defaultValues : {
            username : "",
            password : ""
        }
    });
    const auth = useAuthContext()

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [data, setData] = useState<AuthResponse>()
    const [open, setOpen] = useState(false)

    
    const onSubmit = handleSubmit (async (formData : FormData) => {
        let data;
        setOpen(true)
        try {       
            data = await sendRequest(envConfig.BACKEND_API+'/emp/signin', 'POST', {
                'Content-Type': 'application/json'
            }, JSON.stringify(formData));
            let userData : UserData = {
                userId : data.account.manv,
                token : data.accessToken,
                type : data.account.loainv,
                expiredDateToken : null
            }
            console.log('going auth', userData)
            await auth.login(userData);

            router.push('/')
            router.refresh()
        }catch (error) 
        {
            console.log(error)
        }
    }
    )

    const onCloseModal = () => {
        clearError();
        setData(undefined);
        setOpen(false)
    }

    return (
        <>
    <LoadingModal
        isLoading = {isLoading} 
        open = {open}
        onClose={onCloseModal}
        messOnLoading="Chúng tôi đang tiến hành đăng nhập"
        messOnDone= {data?.message || ""}
        isError = {!!error} 
        messOnError={error}
    />
    <div className="mt-10 flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Xin chào !!!</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <Input 
                    type="text" 
                    label="Mã nhân viên"
                    id="username" 
                    errors = {errors}
                    disabled = {isSubmitting}
                    register={{
                        ...register ("username", {required : true})
                    }}
                    />
                </div>
                <div className="mb-4">
                    <Input 
                        type="password" 
                        label="Mật khẩu"
                        id="password" 
                        errors = {errors}
                        disabled = {isSubmitting}
                        register={{
                            ...register ("password", {required : true})
                        }}
                        />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked/>
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Ghi nhớ</label>
                    </div>

                </div>
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Đăng nhập</button>
            </form>
        </div>
    </div>
    </>
    )
}

export default LoginForm;