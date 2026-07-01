"use client"

import { ChevronRight, Loader, PencilLine, X } from "lucide-react"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import UpdateEmailOTP from "@/app/_components/Update-email-otp/Update-email-otp"
import { useForm } from "react-hook-form"
type FormData = {
  email: string
}
export default function UpdateEmail() {
  const [newEmail, setNewEmail] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      email: ''
    }
  })

  let { register, handleSubmit, formState: { errors }, reset: resetForm } = form


  const changeEmail = async (newEmail: string) => {
    const res = await fetch("/api/change-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newEmail }),
    })



    return res.json()
  }

  const OnSubmit = async (data: FormData) => {
    console.log(data.email);
    setNewEmail(data.email)
    mutate(data.email)




  }

  let { mutate, isError, reset, isPending } = useMutation({
    mutationKey: ['Change-email'],
    mutationFn: changeEmail,
    onSuccess: (data) => {
      console.log(data);
      setShowOtp(true)

    },

  })




  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open:boolean) => {
        if (!open) {
          setShowOtp(false)
          setNewEmail('')
          resetForm({ email: '' })
        }
        setIsDialogOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer">
          <PencilLine color="blue" size={16} />
          <p className="text-sm text-blue-600">Change</p>
        </div>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="w-144.75 h-auto  max-w-none p-9 overflow-hidden rounded-none"
      >

        {showOtp ? <><div className="relative w-full flex items-center mt-4.5">


          <div className="absolute w-full flex  h-0.5 bg-blue-500" />


          <div className="relative z-10 ">
            <div className="w-2.5 h-2.5 bg-blue-600 rotate-45" />
          </div>


          <div className="ml-auto relative z-10">


            <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-blue-100 rotate-45 -translate-x-1/2 -translate-y-1/2 opacity-70" />


            <div className="relative w-2.5 h-2.5 bg-blue-600 rotate-45" />
          </div>

        </div>
        </> : <><div className="flex justify-center">
          <div className="relative mt-4.5 w-[95%] ">
            <div className="border-t-2 border-dashed border-blue-500 relative">
              <div className="absolute -left-3 -top-3">

                <span className="absolute w-6 h-6 bg-blue-100 rotate-45"></span>


                <span className="absolute w-3 h-3 bg-blue-600 rotate-45 top-1.5 left-1.5"></span>
              </div>
              <span className="absolute -right-2 -top-2 w-3 h-3 border-2 border-blue-500 rotate-45 bg-white"></span>
            </div>
          </div>
        </div></>}




        <DialogClose className="absolute right-3.5 top-3.5 z-50">
          <X className="w-4.5 h-4.5 text-gray-700 hover:text-black" />
        </DialogClose>


        {showOtp ? (
          <UpdateEmailOTP
            email={newEmail}
            onVerify={(code) => {
              console.log('OTP entered:', code)
            }}
            onEdit={() => setShowOtp(false)}
            onSuccess={() => setIsDialogOpen(false)}
          />
        ) : (
          <div className="px-6 pb-15">
            <DialogHeader className="">
              <DialogTitle className="text-3xl mt-2.5 font-bold">
                Change Email
              </DialogTitle>
            </DialogHeader>

            <p className="text-blue-600  text-2xl font-bold mt-7.5">
              Enter your new email
            </p>

            <div className="space-y-2 mt-7.5">
              <form id="email-form" onSubmit={handleSubmit(OnSubmit)} >
                <Label className="mb-2">Email</Label>
                <Input
                  className="h-11.5"
                  placeholder="user@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email',
                    },
                  })}
                  onChange={(e) => {
                    setNewEmail(e.target.value)
                    if (isError) {
                      reset()
                    }
                  }}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-2  text-center">{errors.email.message}</p>
                )}
              </form>
              <div className="flex justify-center text-sm text-red-600">
                {isError && 'This email aready exist  !'}
              </div>
            </div>
          </div>
        )}


        <div className="bg-gray-50  w-full ">
          <div className="flex justify-center text-red-600 ">

          </div>
          {!showOtp ? (
            <Button
              type="button"
              disabled={isPending}
              onClick={handleSubmit(OnSubmit)}
              className="w-full bg-blue-600 hover:bg-blue-700 h-11.5 rounded-none"
            >
              {isPending ? <Loader className='animate-spin' /> : <>
                Next
                <ChevronRight />
              </>}
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

