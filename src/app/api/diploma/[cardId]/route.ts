
import { getAuthToken } from "@/features/hooks/get-auth-token";
import { DecodingAuthToken } from "@/lib/util/auth.util";
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function GET(
  req: Request,
  { params }: { params: Promise<{ cardId: string } >}
) {
   let token = await getAuthToken()
      
 let {cardId} = await params

  
    
 
  let res = await fetch(`https://exam-app.elevate-bootcamp.cloud/api/exams?diplomaId=${cardId}&page=1&limit=20`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    let data = await res.json()
    return NextResponse.json(data)

}


