'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { useForm } from 'react-hook-form'
import { ChevronRight, CircleX, Loader } from "lucide-react"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import IEmailVerfication from "@/lib/apis/(Auth)/email-verfication-api"
import EmailVervication from "../email-otp/page"





interface emailType{
    email:string
}


export default function EmailVerificationForm() {

    const [errorMessage, setErrorMessage] = React.useState('')
    const [Otp, setOtp] = React.useState(false)
    const [userEmail, setuserEmail] = React.useState('')
    const [isFocused, setisFocused] = React.useState(false)

   const form = useForm<emailType>()

 React.useEffect(()=>{
    if(isFocused){
        form.setFocus('email')
    }

 },[isFocused])
    
    

    let { mutate: mutateVerfiy, isPending } = useMutation({
        mutationKey: ['emailVerfication'],
        mutationFn: IEmailVerfication,
        onSuccess: (data) => {
            if (data.status) {
                setOtp(true)
                setErrorMessage('')
                console.log('Success', data);
               

            } else {

                setErrorMessage(data?.message || 'This email already exists')
                console.log('Error', data);

            }

        },
        onError: (error) => {

            setErrorMessage(error?.message || 'This email already exists')
            console.log('Error', error)
        }
    })

    const { handleSubmit, formState: { errors }, register } = form

    async function Onsubmit ({email}:emailType) {
     
        setuserEmail(email)
        mutateVerfiy(email)
    }

    return <>
    {
        Otp ? <EmailVervication setOtp={setOtp} userEmail={userEmail} setisFocused={setisFocused}/>: <div className="flex justify-center items-center h-screen">
                <Card className="w-[60%] border-0 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold ">Create Account</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form id="email-form" onSubmit={handleSubmit(Onsubmit)} className="">
                            <Field>
                                <FieldLabel className="text16" htmlFor="email">
                                    Email
                                </FieldLabel>
                                <Input
                                    id="email"
                                    required

                                    placeholder="user@example.com"
                                    className="rounded-none p-2 w-full h-11"
                                    {...register('email', {
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Please enter a valid email address'
                                        },
                                        onChange: () => setErrorMessage('')
                                    })}
                                />
                                {errors.email ? <p className="text-red-600 text-sm">{(errors.email as any).message}</p> : null}
                            </Field>
                        </form>
                    </CardContent>

                    <CardFooter>
                        <div className="w-full">

                            {

                                errorMessage && <div className='w-full h-9.5 bg-red-50 p-2.5 border relative border-red-600 flex justify-center items-center mt-8 '>
                                    <p className='text-red-600'>{errorMessage || 'This email already exists'}</p>
                                    <CircleX size={18} color='red' className='absolute -top-2.5 right-65' />


                                </div>
                            }


                            <Button
                                disabled={isPending}
                                type="submit"
                                form="email-form"
                                className="w-full mt-10 bg-blue-50 text-gray-800 hover:bg-blue-100 cursor-pointer border-blue-600 border h-11.5 rounded-none "

                            >
                                {isPending ? <Loader className='animate-spin' /> : <>
                                    Next
                                    <ChevronRight />
                                </>}

                            </Button>
                        </div>

                    </CardFooter>
                    <div className="flex gap-2 justify-center items-center mt-9">
                        <p className="text-gray-600 text ms">Already have an account?</p>
                        <Link className="text-blue-600 text-ms" href={`/Login`}>
                            Login
                        </Link>

                    </div>
                </Card>
                </div>
    }
    
    
    
    </>
}
