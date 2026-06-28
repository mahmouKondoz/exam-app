import Credentials from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'  
import { IloginResponse } from './lib/Types/login'


export const authOptions: AuthOptions = {
    pages: {
        signIn: '/Login'
    },
    secret: process.env.NEXTAUTH_SECRET,  

    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,  
    },

    jwt: {
        maxAge: 24 * 60 * 60, 
    },

    providers: [
        Credentials({
            name: '',
            credentials: {
                username: {},
                password: {}
            },
            authorize: async (credentials) => {
                const res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/auth/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        username: credentials?.username, 
                        password: credentials?.password 
                    })
                })

                const data: IloginResponse = await res.json()

                if (!data.status) {
                    return null
                }

                return {
                    id: data.payload.user.id,
                    user: data.payload.user,
                    token: data.payload.token
                }
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user, trigger, session }) => {
            if (user && (trigger == 'signIn' || trigger == 'update')) {
                token.user = user.user
                token.token = user.token
            }

            if (trigger === "update" && session?.user) {
                token.user = {
                    ...token.user,
                    ...session.user,
                }
            }
            return token
        },
        session: ({ session, token }) => {
            session.user = token.user
            return session
        }
    }
}