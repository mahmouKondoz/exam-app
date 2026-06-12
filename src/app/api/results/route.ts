import { getAuthToken } from "@/features/hooks/get-auth-token"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST(req: Request){
    let resultBody = await req.json()
     let token = await getAuthToken()
    
    
    let {examId , answers ,startedAt} = resultBody
    let res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/submissions' , {
        method:'POST' , 
        headers:{

             Authorization: `Bearer ${token}` ,
             'Content-Type': 'application/json'


        }, 
        body:JSON.stringify({
            examId:examId ,
            answers:answers ,
            startedAt:startedAt
        })
    })



    let data = await res.json()
    if(!res.ok){
        return NextResponse.json(data.message,{ status: res.status })
    }
    return NextResponse.json({message:'Success' , data})
    
  }
