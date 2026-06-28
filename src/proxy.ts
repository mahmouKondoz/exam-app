import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function proxy(req: NextRequest) {
    const cookieStore = await cookies()
    
    
    let token = cookieStore.get('next-auth.session-token') || 
                cookieStore.get('__Secure-next-auth.session-token')
                
    let { pathname } = req.nextUrl

    let isDashboard = pathname === '/'
    let isAuthPages = pathname.startsWith('/Login') || pathname.startsWith('/Register')

    if (!token && isDashboard) {
        return NextResponse.redirect(new URL('/Login', req.url))
    }

    if (token && isAuthPages) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico).*)'],
}