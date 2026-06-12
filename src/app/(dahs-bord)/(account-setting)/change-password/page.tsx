'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { CircleX, Eye, EyeOff, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface dataType {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string

}
type ShowState = {
  current: boolean
  new: boolean
  confirm: boolean
}

export default function ChangePassword() {

  const router = useRouter()


  const [showpass, setshowpass] = useState<ShowState>({
    current: false,
    confirm: false,
    new: false
  })

  const toggle = (field : keyof ShowState ) => {
    setshowpass((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    mode: 'onBlur'

  })

  let { handleSubmit, register, formState: { errors }, watch  ,reset} = form
  const newPasswordValue = watch("newPassword")
  


  async function handelChangePassword(passwords:dataType){
    let res = await fetch('http://localhost:3000/api/chnage-password' , {
      method:'POST', 
      headers:{
        'Content-Type':'application/json' , 
      }
      ,body:JSON.stringify(passwords)
    })
    let data = await res.json()
    if (!res.ok || !data.status) {
    throw new Error(data.message || "Something went wrong")
  }
    return data

  }

  const handleLogout = async () => {
  await fetch("/api/logout", {
    method: "POST",
  })}


  const {mutate , isError , isPending} = useMutation({
    mutationKey:['change-password'] , 
    mutationFn:handelChangePassword , 
    onSuccess:(data)=>{
     if(data.status){
      console.log(data);
       reset()
      toast.success('Your password has been change')
      handleLogout()
     

      setTimeout(() => {
        router.push('/Login')
        
      }, 1000);

     }else{
      console.log(data);
      
     }
      
    }
  })

  async function Onsubmit(passwords: dataType) {
  
    
    mutate(passwords)
   
   
    


  }

  return (
    <div className="p-6 mt-6">
      <div className="relative">
        <form onSubmit={(handleSubmit(Onsubmit))}>
          <div className='border-gray-100 border-b pb-6'>
           <div className='relative'>
             <Label>Current Password</Label>
            <button
              type="button"
              onClick={() => toggle("current")}
              className="absolute right-3 bottom-4"
            >
              {showpass.current ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} className="text-gray-400" />
              )}
            </button>

            <Input
              className="h-11.5 mt-3"
              type={showpass.current?'text':'password'}
              placeholder="*************"
              {...register('currentPassword', {
                required: '',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                  message: 'Password must be at least 8 characters and include uppercase, lowercase, and a special character'
                }
              })}


            />
            
           </div>
           {errors.currentPassword && (
              <p className="text-red-600 text-center">
                {errors.currentPassword.message}
              </p>
            )}
          </div>
          <div className='mt-4'>
            <div className='relative'>
              <Label>New Password</Label>
            <button
              type="button"
              onClick={() => toggle("new")}
              className="absolute right-3 bottom-4"
            >
              {showpass.new ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} className="text-gray-400" />
              )}
            </button>

            <Input
              className="h-11.5 mt-3"
              type={showpass.new?'text':'password'}
              placeholder="*************"
              {...register('newPassword', {
                required: '',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                  message: 'Password must be at least 8 characters and include uppercase, lowercase, and a special character'
                }
              })}

            />
           
            </div>
             {errors.newPassword && (
              <p className="text-red-600 text-center">
                {errors.newPassword.message}
              </p>
            )}
            <div className='relative'>
              <Label className='mt-4'>Confirm New Password</Label>
            <button
              type="button"
              onClick={() => toggle("confirm")}
              className="absolute right-3 bottom-4"
            >
              {showpass.confirm ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} className="text-gray-400" />
              )}
            </button>

            <Input
              className="h-11.5 mt-3"
              type={showpass.confirm?'text':'password'}
              placeholder="*************"
              {...register('confirmPassword', {
                required: '',
                validate: (value) =>  value === newPasswordValue || "Passwords do not match"
                
              })}

            />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-center">
                {errors.confirmPassword.message}
              </p>
            )}
            {
              isError && <div className='w-full h-9.5 bg-red-50 p-2.5 border relative border-red-600 flex justify-center items-center mt-8'>
                <p className='text-red-600'>Something went wrong</p>
                <CircleX size={18} color='red' className='absolute -top-2.5 right-130' />


              </div>
            }
            <Button 
            disabled={isPending}
            className='w-full h-11.5 bg-blue-600 hover:bg-blue-700 rounded-none mt-8 cursor-pointer'>

              {isPending ? <Loader className='animate-spin' /> : <>
                Update Password
               
              </>}
            </Button>

          </div>
        </form>
      </div>
    </div>
  )
}
