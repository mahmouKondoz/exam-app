'use client'
import ResetPasswordLink from '@/app/_components/reset-password-link/reset-password-link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import ForgotPasswordApi from '@/lib/apis/(Auth)/forgot-password'
import { useMutation } from '@tanstack/react-query'
import { ChevronRight, Loader } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function page() {
    const [issent, setIssent] = useState(false)
    const [userEmail, setuserEmail] = useState('')
     



    let form = useForm({
        defaultValues: {
            email: ''
        },
        mode: 'onBlur'
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ['forgot-password'],
        mutationFn: ForgotPasswordApi,
        onSuccess: (data) => {
            console.log(data);
            

           
            setIssent(true)

        },
        onError: (error) => {
            


        }

    })



    const { register, handleSubmit, formState: { errors } } = form



    async function Onsubmit(userEmail: { email: string }) {
        const email = userEmail.email
        mutate(email)
        setuserEmail(email)

    }






    return <>
        {issent ? <ResetPasswordLink setIssent={setIssent} email={userEmail}/> : <>
            <div className="flex justify-center items-center h-screen">
                <Card className="w-[60%] border-0 shadow-none">
                    <CardHeader className='mb-4'>
                        <CardTitle className="text-4xl font-bold ">Forgot Password</CardTitle>
                        <p className='text-gray-500 font-normal mt-2.5'>Don’t worry, we will help you recover your account.</p>
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

                                    })}
                                />
                                {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                            </Field>
                        </form>
                    </CardContent>

                    <CardFooter>
                        <div className="w-full">

                            {/* {

                                errorMessage && <div className='w-full h-9.5 bg-red-50 p-2.5 border relative border-red-600 flex justify-center items-center mt-8 '>
                                    <p className='text-red-600'>{errorMessage || 'This email already exists'}</p>
                                    <CircleX size={18} color='red' className='absolute -top-2.5 right-65' />


                                </div>
                            } */}


                            <Button
                                disabled={isPending}
                                type="submit"
                                form="email-form"
                                className="w-full mt-10 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer  h-11.5 rounded-none "

                            >
                                {isPending ? <Loader className='animate-spin' /> : <>
                                    Next
                                    <ChevronRight />
                                </>}


                            </Button>
                        </div>

                    </CardFooter>
                    <div className="flex gap-2 justify-center items-center mt-9">
                        <p className="text-gray-600 text ms">Don't have an account?</p>
                        <Link className="text-blue-600 text-ms font-medium" href={`Register`}>
                            Create yours
                        </Link>

                    </div>
                </Card>
            </div>
        </>}



    </>
}
