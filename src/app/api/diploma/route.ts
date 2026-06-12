import { getAuthToken } from "@/features/hooks/get-auth-token"
import { DecodingAuthToken } from "@/lib/util/auth.util"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export  async function GET(req:Request){
     let token = await getAuthToken()
    
     
     
  
    

    let {searchParams} = new URL(req.url)
    let page = searchParams.get('page') || '1'
    
    
    
    let res = await fetch(`https://exam-app.elevate-bootcamp.cloud/api/diplomas?page=${page}&limit=6` , {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    let data = await res.json()
    if(!res.ok){return NextResponse.json(data.message,{ status: res.status })}

    return NextResponse.json(data)
}