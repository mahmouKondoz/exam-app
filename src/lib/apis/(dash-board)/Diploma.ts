
'use server '

import { cookies } from "next/headers";

export default async function DiplomaApi(){
    const token = (await cookies()).get('token')?.value;
    
    let res = await fetch('/api/diploma' , {
         headers:{
            Authorization:`Bearer ${token}`
        }
    })
    let data = await res.json()
    return data

}