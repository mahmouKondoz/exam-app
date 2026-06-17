"use client"

import { Loader, X } from "lucide-react"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { IVerifyEmailResponse } from "@/lib/Types/user"
import { useSession } from "next-auth/react"


interface UpdateEmailOTPProps {
    email: string
    onVerify: (code: string) => void
    onEdit: () => void
    onSuccess: () => void

    
}

export default function UpdateEmailOTP({ email, onVerify, onEdit, onSuccess }: UpdateEmailOTPProps) {
    const [otpValues, setOtpValues] = useState("")
    const code = otpValues
    const {update} = useSession()


    async function handelEmailOtp() {
        let res = await fetch('http://localhost:3000/api/update-email-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
        })
        const data:IVerifyEmailResponse = await res.json()

        if (!res.ok) {
            throw new Error(data.code || 'Failed to verify OTP')
        }

        return data
    }
    

    let { mutate, isPending, error, reset } = useMutation({
        mutationKey: ['change-email-opt'],
        mutationFn: handelEmailOtp,
        onSuccess: (data) => {
            console.log(data);
            update({
                user:{
                    email:data.payload.user.email
                }
            })
           
            if(data.status){
                 toast.success('Email has been updated successfully!')  

            }
            onSuccess()
            
            
        }
    })

    return (
        <div className="px-6 ">
            <DialogHeader>
                <DialogTitle className="text-3xl font-bold mt-2.5">Change Email</DialogTitle>
            </DialogHeader>

            <p className="text-blue-600 text-2xl font-bold mt-7.5">
                Verify OTP
            </p>

            <p className='mt-2.5 text-gray-500 font-normal tracking-widest w-full'> Please enter the 6-digits code we sent to:{" "}</p>
            <span className=" font-normal me-2 text-black ">{email}</span>.
            <span className='text-blue-600 text16  font-normal underline cursor-pointer' onClick={onEdit}>Edit</span>

            <div className="space-y-4 mt-7.5">
                <Field>
                    <InputOTP
                        onChange={(values:string) => {
                            setOtpValues(values)
                            if (error) reset()
                        }}
                        maxLength={6}
                        id="otp-verification"
                        required
                    >
                        <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:rounded-none gap-5">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </Field>

                <div className="text-center">
                    <p className="text-sm text-gray-500 font-medium tracking-normal">
                        You can request another code in: 60s
                    </p>
                </div>
            </div>

            <div className="bg-gray-50 w-full mt-6 pt-4">
                {error && (
                    <div className="text-center text-red-600 mb-4">
                        {error.message || 'Something went wrong!'}
                    </div>
                )}
                <Button
                    onClick={() => mutate()}
                    disabled={isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 h-11.5 rounded-none disabled:opacity-50"
                >
                    {isPending ? <Loader className='animate-spin ' /> : 'Verify Code'}
                </Button>


            </div>
        </div>
    )
}
