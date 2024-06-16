"use server";
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers'

export type FormData = {
    username : string , 
    password : string 
};

export type ResponseData = {
    message : string ,
    account : object,
    ok : boolean
}
export async function setCookie(data : any) {
    await cookies().set({
        name: 'sessionToken',
        value: data.accessToken,
        httpOnly: true,
        path: '/',
    })
}
