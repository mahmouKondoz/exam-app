import { NextRequest, NextResponse } from "next/server";
import { DecodingAuthToken } from "./lib/util/auth.util";
import { cookies } from "next/headers";



export default async function proxy(req:NextRequest){

  


    let token = (await cookies()).get('next-auth.session-token')
    let {pathname} = req.nextUrl

    let isDashboard = pathname === '/'
    let isAuthPages = pathname.startsWith('/Login') || pathname.startsWith('/Register') 

    if(!token && isDashboard){
        
        return NextResponse.redirect(new URL('/Login' ,req.url ))
    }

    if(token && isAuthPages){
      return NextResponse.redirect(new URL('/' , req.url))
    }


    return NextResponse.next()


     

}
export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
}