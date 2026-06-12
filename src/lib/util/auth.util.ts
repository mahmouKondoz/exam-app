'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function DecodingAuthToken(){

    const storeCookies = cookies()
    const token = (await storeCookies).get(process.env.NEXTAUTH_TOKEN!)?.value

    try {

        const jwt = decode({
            token,
            secret:process.env.NEXTAUTH_SECRET!
        })
        return jwt
        
    } catch (error) {

        return null

        
    }

}