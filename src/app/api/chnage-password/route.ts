import { getAuthToken } from "@/features/hooks/get-auth-token"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(req:Request){
    const passwords = await req.json()
   let token = await getAuthToken()
    const res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/users/change-password' , {
        method:'POST' , 
        headers:{
            Authorization:`Bearer ${token}` ,
            'Content-Type': 'application/json'
        } , 
        body:JSON.stringify(passwords)
    })

    if(!res.ok){
        return('Somthing went wrong')
    }

    const data = await res.json()

    return NextResponse.json({status:'Succuss' , data})
}