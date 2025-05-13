import { cache } from "react";
import getToken from "./token";
import {redirect} from 'next/navigation'


export const verifySession = cache(async () => {
    const token = getToken();

    if(!token){
        redirect('')
    }
    const url = ``
})