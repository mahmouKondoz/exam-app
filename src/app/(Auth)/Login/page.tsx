'use client'
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import Link from "next/link"

import { CircleX, Eye, EyeOff, Loader } from "lucide-react"
import { LoginMutate } from "@/features/hooks/user-login"


export interface TLoginData {
  username: string,
  password: string
}


export default function Login() {
  const [isEror, setIsEror] = React.useState<null | string | undefined>(null)
  const [eye, seteye] = React.useState(false)
  const { mutate: login, isPending, isError, reset } = LoginMutate()







  const schema = z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(15, "Username must not exceed 15 characters"),
    password: z
      .string()
      .min(1, "Password is required"),
  })

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(schema)
  })

  let { watch } = form
  let passValue = watch('password')



  const handleLogin = async (LoginData: TLoginData) => {
    login(LoginData)



  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[60%] border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form-login" onSubmit={form.handleSubmit(handleLogin)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text16" htmlFor="form-login-username">
                      Username
                    </FieldLabel>
                    <Input
                      className="rounded-none p-2 w-55 h-11"
                      {...field}
                      id="form-login-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="user123"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller

                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="relative overflow-hidden ">
                    <FieldLabel className="text16" htmlFor="form-rhf-demo-title">
                      Password
                    </FieldLabel>
                    <Input
                      className="rounded-none p-2 w-55 h-11"
                      {...field}
                      type={eye ? 'text' : 'password'}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="**************"
                      autoComplete="off"
                    />
                    <Link className="text-end text-blue-600 font-medium" href={'forgot-password'}>Forgot your password?</Link>


                    <div className='absolute top-12 left-125'>
                      {eye ? <Eye onClick={() => { seteye(!eye) }} size={18} /> : <EyeOff onClick={() => { seteye(!eye) }} size={18} className="text-gray-400 cursor-pointer" />}
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <div className="w-full">
              <div>
                {
                  isError && <div className='w-full h-9.5 bg-red-50 p-2.5 border relative border-red-600 flex justify-center items-center mt-8 mb-24.5'>
                    <p className='text-red-600'>{'Wrong username or password'}</p>
                    <CircleX size={18} color='red' className='absolute -top-2.5 right-65' />


                  </div>
                }
                <Button
                  className={`w-full bg-blue-600 hover:bg-blue-700 rounded-none h-11 ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  type="submit"
                  form="form-login"
                  disabled={isPending}
                >
                  {isPending ? <Loader className="animate-spin" /> : 'Login'}
                </Button>
              </div>

              <div className="flex gap-2 justify-center items-center mt-9">
                <p className="text-gray-600">Don't have an account?</p>
                <Link className="text-blue-600" href={`/Register`}>
                  Create yours
                </Link>
              </div>
            </div>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
