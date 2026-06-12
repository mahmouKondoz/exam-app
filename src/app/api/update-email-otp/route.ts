import { getAuthToken } from "@/features/hooks/get-auth-token";
import { IVerifyEmailResponse } from "@/lib/Types/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    let token = await getAuthToken()
    const code = await req.json()
    let res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/users/email/confirm', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(code)
    })
    const data: IVerifyEmailResponse = await res.json()

    if (!res.ok) {
        return NextResponse.json(
            { message: data.code || 'Failed to verify OTP' },
            { status: res.status }
        )
    }
    return NextResponse.json(data)

}