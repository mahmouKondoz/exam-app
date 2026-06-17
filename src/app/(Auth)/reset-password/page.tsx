'use client'

import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { CircleX, Eye, EyeOff, Loader } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import RestPasswordApi from '@/lib/apis/(Auth)/reset-password.api'
import { respasswordType } from '@/lib/Types/reset-password'
import { toast } from 'sonner'


type ShowState = {
  password: boolean
  confirm: boolean


}

export default function CreatePassword() {

  const searchParams = useSearchParams()
  const userToken = searchParams.get('token')
  const route = useRouter()


  const {mutate , isPending , isError , error } = useMutation({
    mutationKey:['CreatePassword'] , 
    mutationFn:RestPasswordApi , 
    onSuccess:(data)=>{
      console.log('Success' , data);
      toast.success(data.message)
      route.push('Login')

      
    } , 
    onError:(error)=>{
      console.log('Error' , error.message);
      
    }
  })


  const [showPass, setshowPass] = useState<ShowState>(
    {
      password: false,
      confirm: false
    }

  )

  const schema = z.object({
    token: z.string(),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character'),

    confirmPassword: z.string()
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })


  const form = useForm({
    defaultValues: {
      token: userToken || '',
      newPassword: '',
      confirmPassword: ''
    },
    mode: 'onBlur',
    resolver: zodResolver(schema)


  }

  )

  const { handleSubmit } = form










  async function onSubmit(data:respasswordType) {
    console.log(data);
    
   mutate(data)

  }






  return (


    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col justify-center items-center h-screen overflow-hidden'>

        <Card className='className=" w-[60%] border-0 shadow-none'>

          <div>
            <p className='text-3xl font-bold text-gray-800 text-start'>Create a New Password</p>
            <p className=' text-gray-500 my-4'>Create a new strong password for your account </p>
          </div>



          <Controller

            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <FieldLabel className="text16" htmlFor="form-rhf-demo-title">
                  <p >Password </p>
                </FieldLabel>
                <Input
                  className="rounded-none p-2 w-55 h-11"
                  {...field}
                  type={showPass.password ? 'text' : 'password'}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="*******"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <div className='absolute top-11 left-137'>
                  {
                    showPass.password ? <Eye onClick={() => { setshowPass(prev => ({ ...prev, password: !prev.password })) }} size={18} /> : <EyeOff onClick={() => { setshowPass(prev => ({ ...prev, password: !prev.password })) }} size={18} className="text-gray-400 cursor-pointer" />
                  }
                </div>
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="relative" data-invalid={fieldState.invalid}>
                <FieldLabel className="text16 mt-4" htmlFor="form-rhf-demo-title">
                  <p> Confirm Password </p>
                </FieldLabel>
                <Input
                  className="rounded-none p-2 w-55 h-11"
                  {...field}
                  type={showPass.confirm ? 'text' : 'password'}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="*******"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <div className='absolute top-15 left-137'>
                  {showPass.confirm ? <Eye onClick={() => { setshowPass(prev => ({ ...prev, confirm: !prev.confirm })) }} size={18} /> : <EyeOff onClick={() => { setshowPass(prev => ({ ...prev, confirm: !prev.confirm })) }} size={18} className="text-gray-400 cursor-pointer" />}
                </div>
              </Field>
            )}

          />

           {
                  isError && <div className='w-full h-9.5 bg-red-50 p-2.5 border relative border-red-600 flex justify-center items-center mt-8 mb-24.5'>
                    <p className='text-red-600'>{error.message}</p>
                    <CircleX size={18} color='red' className='absolute -top-2.5 right-70' />


                  </div>
                }


         
          <Button
                  className={`w-full bg-blue-600 hover:bg-blue-700 h-11.5 rounded-none mt-10 ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  disabled={isPending}
                >
                  {isPending ? <Loader className="animate-spin" /> : 'Reset Password'}
                </Button>
          <div className="flex gap-2 justify-center items-center mt-9">
            <p className="text-gray-600">Don't have an account?</p>
            <Link className="text-blue-600" href={`/Register`}>
              Create yours
            </Link>
          </div>

        </Card>

      </div>
    </form>
  )


}
