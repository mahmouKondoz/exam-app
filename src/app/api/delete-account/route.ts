import { getAuthToken } from "@/features/hooks/get-auth-token"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function DELETE() {
    let token = await getAuthToken()
    
    let res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/users/account', { 
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        return NextResponse.json(  
            { status: 'error', data: 'Something went wrong' },
            { status: 500 }
        )
    }

    ;(await cookies()).set('token', '', {
        expires: new Date(0),
        path: '/'
    })

    const data = await res.json()

    return NextResponse.json({ message: 'Account Deleted', data })  
}