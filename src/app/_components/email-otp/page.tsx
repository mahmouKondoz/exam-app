'use client'
import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { CircleX, Loader, MoveLeft } from "lucide-react"
import Link from 'next/link';
import { toast } from 'sonner';
import ConfirmEmail from '@/lib/apis/(Auth)/confirm-email';
import Stepper from '@/shared/components/auth-prograss-bar/page';
import UserRegistrationInfo from '../user-registration-info/user-registration-info';



interface EmailVervicationTyps {
  userEmail: string,
  setOtp: (x: boolean) => void , 
  setisFocused:(x:boolean)=>void
}

export default function EmailVervication({ userEmail, setOtp , setisFocused }: EmailVervicationTyps) {

  const [otpValues, setotpValues] = useState<string>()
  const [isVerfiyed, setIsVerfiyed] = useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  

  let { mutate: OtpMutate, isPending } = useMutation({
    mutationKey: ['verify-otp'],
    mutationFn: ConfirmEmail,
    onSuccess: (data) => {
      if (data.status) {
        setIsVerfiyed(true)
        setErrorMessage('')
        console.log('Success', data);
      } else {
        setErrorMessage(data?.message || 'Verification code is invalid or has expired.')
        console.log('Error', data);
      }
    }
  })

  let userOtp = {
    code: otpValues,
    email: userEmail
  }

  function handelVerfication() {
    OtpMutate(userOtp)
  }

  return <>
    {
      isVerfiyed ? <UserRegistrationInfo email={userEmail} /> : <>

        <div className='flex flex-col justify-center items-center w-full h-screen'>


          <div className='w-[50%]'>
            <Stepper totalSteps={4} currentStep={1} />
          </div>

          <Card className="mx-auto max-w-md shadow-none border-none w-full">
            <CardHeader className='mb-4'>



              <CardTitle className='text-3xl font-bold text-gray-800'>Create Account
                <p className='font-bold text-2xl text-blue-600 mt-4'>Verfiy OTP</p>
              </CardTitle>

              <CardDescription className='w-full h-5 mb-6'>
                <p className='text16 font-normal tracking-widest w-full'>
                  Please enter the 6-digits code we sent to:{' '}
                  <span className='font-normal me-2 text-black'>
                    {userEmail}{' '}
                    <span
                      onClick={() => { setisFocused(true) ,  setOtp(false) }}
                      className='text-blue-600 text16 font-normal underline cursor-pointer'
                    >
                      Edit
                    </span>
                  </span>
                </p>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Field>
                <InputOTP onChange={(values: string | undefined) => { setotpValues(values) }} maxLength={6} id="otp-verification" required>
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:rounded-none gap-5">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <div className="text-center mt-6">
                  <p className='text-sm text-gray-500 font-medium tracking-normal'>
                    Didn't receive the code?{' '}
                    <span>
                      <Link onClick={() => { }} className='text-sm text-blue-600' href={''}>
                        Resend Code
                      </Link>
                    </span>
                  </p>
                </div>
              </Field>
            </CardContent>

            <CardFooter className='mt-4'>
              <Field>
                {

                  errorMessage && <div className='w-full h-9.5 bg-red-50 p-2.5 border relative border-red-600 flex justify-center items-center my-8 '>
                    <p className='text-red-600'>{errorMessage || 'This email already exists'}</p>
                    <CircleX size={18} color='red' className='absolute -top-2.5 right-50' />


                  </div>
                }
                <Button
                  disabled={isPending}
                  onClick={() => { handelVerfication() }}
                  type="submit"
                  className={`w-full rounded-none h-11 text-gray-800 bg-white hover:bg-white hover:text-gray-800 ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isPending ? <Loader className='animate-spin' /> : 'Verify code'}
                </Button>
              </Field>
            </CardFooter>
          </Card>
        </div>

      </>
    }
  </>
}