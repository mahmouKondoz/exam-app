import { authOptions } from "@/auth";
import NextAuth from "next-auth";


const handeller = NextAuth (authOptions)

export {handeller as GET , handeller as POST}