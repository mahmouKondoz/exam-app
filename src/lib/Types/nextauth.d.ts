import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        token:string
        user:IUser
    }
  
  interface Session {
    user: IUser
  }
}

import { JWT } from "next-auth/jwt"
import { userLogin } from "./login"

declare module "next-auth/jwt" {
  
  interface JWT {
    token: string
    user:IUser
  }
}