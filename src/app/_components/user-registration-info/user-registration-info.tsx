
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

import { PhoneInput } from "@/app/_components/phone-input/phone-input"
import { ChevronLeft, ChevronRight, CircleX } from "lucide-react"
import CreatePassword from "../create-password/create-password"
import Stepper from "@/shared/components/auth-prograss-bar/page"
import { useRouter } from "next/navigation"


let shechma = z.object({

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(15, "Username must not exceed 15 characters"),

  email: z.string().email("Please enter a valid email address"),


  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, and a special character"
    ),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(10, "First name must not exceed 10 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(10, "Last name must not exceed 10 characters"),

  phone: z
    .string()
    .regex(
      /^\+20(10|11|12|15)\d{8}$/,
      "Please enter a valid Egyptian phone number"
    ),


}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

interface EmailVervicationTyps {
  email: string,

}


export default function UserRegistrationInfo({ email }: EmailVervicationTyps) {
  const [isSubmit, setIsSubmit] = React.useState(false)
  const [isError, setisError] = React.useState('')
  const [isverfiy, setisverfiy] = React.useState(false)

  const route = useRouter()

  



  let form = useForm({

    defaultValues: {
      username: '',
      email: email,
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: ''

    },
    resolver: zodResolver(shechma),
    mode: 'onBlur' ,
     


  })

  React.useEffect(() => {

    if (isError.includes('This phone number is already registered')) {
      form.setFocus('phone')

    } if (isError.includes('This username is already taken')) {
      form.setFocus('username')

    }if (isError.includes('Your email is not verified.')) {
      setisverfiy(true)

    }


  }, [isError])





  async function Onsubmit() {
    if(!isverfiy){
      const isValid = await form.trigger(['firstName', 'lastName', 'username', 'phone'])

    if (isValid) {
      setIsSubmit(true)
    }
    }else{
      console.log('refresh');
      
      window.location.reload()
    }

  }



  return <>
    {
      isSubmit ? <CreatePassword form={form} setIsSubmit={setIsSubmit} setisError={setisError} /> : <>

        <div>

          {<div className="flex justify-center items-center h-screen">

            <Card className=" w-[60%] border-0 shadow-none">
              <CardHeader>
                <div className='w-full'>
                  <Stepper totalSteps={4} currentStep={2} />
                </div>

                <CardTitle className="text-4xl font-bold ">
                  Create Account
                </CardTitle>
                <p className="font-bold text-2xl text-blue-600 my-4">  Tell us more about you </p>

              </CardHeader>
              <CardContent>
                <form id="form-rhf-demo" className="overflow-hidden">
                  <FieldGroup>
                    <div className="flex gap-2">
                      <Controller

                        name="firstName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text16" htmlFor="form-rhf-demo-title">
                              <p>Frist name<span className="text-red-600 ms-1">*</span></p>
                            </FieldLabel>
                            <Input
                              className="rounded-none p-2 w-55 h-11"
                              {...field}
                              id="form-rhf-demo-title"
                              aria-invalid={fieldState.invalid}
                              placeholder="Mahmoud"
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="lastName"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text16" htmlFor="form-rhf-demo-title">
                              <p>Last name<span className="text-red-600 ms-1">*</span></p>

                            </FieldLabel>
                            <Input

                              className="rounded-none p-2 w-55 h-11"
                              {...field}
                              id="form-rhf-demo-title"
                              aria-invalid={fieldState.invalid}
                              placeholder="Abdelazim"
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <Controller
                      name="username"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="text16" htmlFor="form-rhf-demo-title">
                            <p>User Name<span className="text-red-600 ms-1">*</span></p>

                          </FieldLabel>
                          <Input

                            className="rounded-none p-2 w-55 h-11"
                            {...field}
                            id="form-rhf-demo-title"
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
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>

                          <FieldLabel className="text16">
                            Phone Number
                          </FieldLabel>

                          <PhoneInput

                            {...field}
                            defaultCountry="EG"
                            placeholder="Enter phone number"
                          />

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
                    {

                      isError && <div className='w-full h-9.5 bg-red-50 p-2.5 border relative border-red-600 flex justify-center items-center my-8 '>
                        <p className='text-red-600'>{isverfiy? 'We need to reverify your email.':isError}</p>
                        <CircleX size={18} color='red' className='absolute -top-2.5 right-64' />


                      </div>
                    }

                    <div>
                      <Button

                        onClick={Onsubmit}
                        className="w-full mt-10 bg-blue-50 text-gray-800 hover:bg-blue-100 border-blue-600 border cursor-pointer h-11.5 rounded-none" type="button" form="form-rhf-demo">
                       
                        {isverfiy ? <>
                         <ChevronLeft />
                         Reverify
                        
                        </>:<>
                         Next
                        <ChevronRight />
                        </>}
                      </Button>
                    </div>

                  </div>
                </Field>
              </CardFooter>
            </Card>


          </div>}


        </div>

      </>
    }
  </>

}
