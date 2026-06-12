'use client'

import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Isregister } from '@/lib/Types/UserData'
import Stepper from '@/shared/components/auth-prograss-bar/page'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<Isregister>  , 
  setIsSubmit:(x:boolean)=>void
    setisError:(x:string)=>void

}
type ShowState = {
  password: boolean
  confirm: boolean

 
}

export default function CreatePassword({ form  , setIsSubmit , setisError}: Props) {

  


  const route = useRouter()
 

  
  const [showPass, setshowPass] = useState<ShowState>(
    {
      password:false , 
      confirm:false
    }

  )

  async function handelRegistr(getValues:Isregister){
    try {
      let res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/auth/register' , {
      method:'POST' , 
      headers:{
        'Content-Type':'application/json'
      } ,
      body:JSON.stringify(getValues)

    })
    let data = await res.json()
    return data
      
    } catch (error) {
       
      console.log('Error',error);
    
      
      
    }
    
  }


  const {mutate} = useMutation({
    mutationKey:['registration'] , 
    mutationFn:handelRegistr , 
    onSuccess:(data)=>{
      if(data.status){
        console.log('Success' , data);
        route.push('/Login')
        
      }else{
        console.log('Error' , data);
        setisError(data.message)
        setIsSubmit(false)

        
      }
      

    }
  })
  




  let {  getValues  , trigger} = form

  async function Onsubmit(){
    const isvalid = await trigger(['password' , 'confirmPassword'])
    if(isvalid){
      mutate(getValues())

      
    }
    
  }

  
  
  return (


    <div className='flex flex-col justify-center items-center h-screen overflow-hidden'>

      <Card className='className=" w-[60%] border-0 shadow-none'>
        <div className='w-full '>
          <Stepper totalSteps={4} currentStep={3} />
        </div>
        <div>
          <p className='text-3xl font-bold text-gray-800 text-start'>Create Account</p>
          <p className='text-2xl font-bold text-blue-600 my-4'>Create a strong  password</p>
        </div>



        <Controller

          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="relative">
              <FieldLabel className="text16" htmlFor="form-rhf-demo-title">
                <p >Password<span className='text-red-600 ms-1'>*</span> </p>
              </FieldLabel>
              <Input
                className="rounded-none p-2 w-55 h-11"
                {...field}
                type={showPass.password ? 'text':'password'}
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
                  showPass.password ? <Eye onClick={()=>{setshowPass(prev=>({...prev , password:!prev.password}))}} size={18} /> : <EyeOff onClick={()=>{setshowPass(prev => ({ ...prev, password: !prev.password }))}} size={18} className="text-gray-400 cursor-pointer" />
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
                <p> Confirm Password<span className='text-red-600 ms-1'>*</span> </p>
              </FieldLabel>
              <Input
                className="rounded-none p-2 w-55 h-11"
                {...field}
                type={showPass.confirm ? 'text':'password'}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="*******"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
              <div className='absolute top-15 left-137'>
                {showPass.confirm ? <Eye onClick={()=>{setshowPass(prev=>({...prev , confirm:!prev.confirm}))}} size={18} /> : <EyeOff onClick={()=>{setshowPass(prev => ({ ...prev, confirm: !prev.confirm }))}} size={18} className="text-gray-400 cursor-pointer" />}
              </div>
            </Field>
          )}

        />


        <Button onClick={Onsubmit} className='w-full bg-blue-600 hover:bg-blue-700 h-11.5 rounded-none mt-10'>Create Account</Button>

      </Card>

    </div>
  )
}


