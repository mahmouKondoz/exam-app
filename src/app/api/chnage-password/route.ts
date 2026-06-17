import { getAuthToken } from "@/features/hooks/get-auth-token"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const passwords = await req.json()
    let token = await getAuthToken()
    
    const res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/users/change-password', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwords)
    })

    if (!res.ok) {
        return NextResponse.json(  
            { status: 'error', data: 'Something went wrong' },
            { status: 500 }
        )
    }

    const data = await res.json()
    return NextResponse.json({ status: 'Success', data })
}