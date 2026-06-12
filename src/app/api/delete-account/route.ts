import { getAuthToken } from "@/features/hooks/get-auth-token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(){
   let token = await getAuthToken()
    let res = fetch('https://exam-app.elevate-bootcamp.cloud/api/users/account' , {
        method:'DELETE' , 
        headers:{
             Authorization:`Bearer ${token}`
        }
    })

    ;(await cookies()).set('token' , '' ,{
        expires:new Date(0) , 
        path:'/'
    })
    let data = await (await res).json()

    NextResponse.json({message:'account Deleted' , data})
}