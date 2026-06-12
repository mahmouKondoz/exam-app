
import { getAuthToken } from "@/features/hooks/get-auth-token"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function PATCH(req: Request) {

    
    let token = await getAuthToken()
  const UserNewData = await req.json()
  console.log('SENDING DATA:', UserNewData)
    let res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/users/profile', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(UserNewData)
    })

    let data = await res.json()
    if (!res.ok) {
        return NextResponse.json(data.message, { status: res.status })
    }

    return NextResponse.json({ message: 'success', data })

}