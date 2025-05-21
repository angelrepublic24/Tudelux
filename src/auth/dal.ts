import 'server-only'
import { redirect } from "next/navigation";
import { UserSchema } from "../schemas";
import { cache } from "react";
import getToken from './token';
import { Api } from '@/global/Global';


export const verifySession = cache( async () => {
    const token = await getToken()
    if(!token) {
        redirect('/auth/login');
    }

    console.log(token);
    const {data} = await Api.get('/auth/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    })
    console.log(data);

    const result = UserSchema.safeParse(data);

    if(!result.success){
        redirect('/auth/login');
    }

    return {
        user: result.data,
        isAuth: true
    }
})