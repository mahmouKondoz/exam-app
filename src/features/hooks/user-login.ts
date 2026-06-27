'use client'
import { TLoginData } from "@/app/(Auth)/Login/page";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export function LoginMutate() {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (LoginData: TLoginData) => {
            const res = await signIn('credentials', {
                username: LoginData.username,
                password: LoginData.password,
                redirect: false
            })

            if (!res?.ok) {
                throw new Error(res?.error || 'Something went wrong')
            }

            return res
        },
        onSuccess: () => {
            window.location.href = '/diplomas'  // ✅ hardcoded to your main page
        }
    })
}