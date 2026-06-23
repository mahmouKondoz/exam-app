'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { CircleX, Eye, EyeOff, Loader } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
  const router = useRouter()

 
  const [token, setToken] = useState('')

  useEffect(() => {
    const t = searchParams.get('token')
    if (t) setToken(t)
  }, [searchParams])

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['CreatePassword'],
    mutationFn: RestPasswordApi,
    onSuccess: (data) => {
      toast.success(data.message)
      router.push('/Login')
    },
    onError: (error: any) => {
      console.log('Error', error.message)
    },
  })

  const [showPass, setShowPass] = useState<ShowState>({
    password: false,
    confirm: false,
  })

  const schema = z
    .object({
      token: z.string().min(1, 'Token is required'),
      newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    })

  const form = useForm<respasswordType>({
    defaultValues: {
      token: '', 
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })

  
  useEffect(() => {
    if (token) {
      form.setValue('token', token)
    }
  }, [token])

  const { handleSubmit } = form

  async function onSubmit(data: respasswordType) {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
        <Card className="w-[60%] border-0 shadow-none">
          <div>
            <p className="text-3xl font-bold text-gray-800">
              Create a New Password
            </p>
            <p className="text-gray-500 my-4">
              Create a new strong password for your account
            </p>
          </div>

          {/* Password */}
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <FieldLabel>Password</FieldLabel>

                <Input
                  {...field}
                  type={showPass.password ? 'text' : 'password'}
                  placeholder="*******"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                <div className="absolute top-10 right-3 cursor-pointer">
                  {showPass.password ? (
                    <Eye
                      size={18}
                      onClick={() =>
                        setShowPass((p) => ({ ...p, password: false }))
                      }
                    />
                  ) : (
                    <EyeOff
                      size={18}
                      onClick={() =>
                        setShowPass((p) => ({ ...p, password: true }))
                      }
                    />
                  )}
                </div>
              </Field>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <FieldLabel>Confirm Password</FieldLabel>

                <Input
                  {...field}
                  type={showPass.confirm ? 'text' : 'password'}
                  placeholder="*******"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}

                <div className="absolute top-10 right-3 cursor-pointer">
                  {showPass.confirm ? (
                    <Eye
                      size={18}
                      onClick={() =>
                        setShowPass((p) => ({ ...p, confirm: false }))
                      }
                    />
                  ) : (
                    <EyeOff
                      size={18}
                      onClick={() =>
                        setShowPass((p) => ({ ...p, confirm: true }))
                      }
                    />
                  )}
                </div>
              </Field>
            )}
          />

          {/* Error */}
          {isError && (
            <div className="w-full bg-red-50 p-3 border border-red-600 flex items-center justify-center mt-6 relative">
              <p className="text-red-600">{error?.message}</p>
              <CircleX size={18} className="absolute right-3 text-red-600" />
            </div>
          )}

          {/* Submit */}
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 h-11 mt-6"
            disabled={isPending}
          >
            {isPending ? <Loader className="animate-spin" /> : 'Reset Password'}
          </Button>

          {/* Link */}
          <div className="flex gap-2 justify-center mt-6">
            <p>Don't have an account?</p>
            <Link className="text-blue-600" href="/Register">
              Create yours
            </Link>
          </div>
        </Card>
      </div>
    </form>
  )
}