'use client'
import { Button } from '@/components/ui/button'
import { CircleUserRound,  Lock, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function SettingSideBar() {
    let pathName = usePathname()
    const route = useRouter()
   const handleLogout = async () => {
  await fetch("/api/logout", {
    method: "POST",
  })}
    
  return (
    <div>
      <div className='w-90.5 bg-white p-6 flex justify-between flex-col h-230 '>
          {/* TOP */}
          <div>
            <Link href={'profile'}>
              <div className={`${pathName === '/profile' ? 'py-2.5 px-4 flex justify-center items-center gap-2.5 border bg-blue-50 text-blue-600':'py-4 px-2.5 flex justify-center items-center text-gray-500 gap-2.5'}`}>
                <CircleUserRound  size={24} />
                <p className=''>Profile</p>
              </div>
            </Link>

          <Link href={'change-password'}>
            
              <div className={`${pathName === '/change-password' ? 'py-2.5 px-4 flex justify-center items-center gap-2.5 border bg-blue-50 text-blue-600':'py-4 px-2.5 flex justify-center items-center text-gray-500 gap-2.5'}`}>
              <Lock size={24} />
              <p>Change password</p>
            </div>
          </Link>

          </div>
          {/* BOTTOM */}
          <div>
            <Button
            onClick={()=>{
              handleLogout()
              setTimeout(() => {
                route.push('/Login')
                
              }, 1000);


            }}
             className='border py-2.5 px-4 flex justify-center bg-red-50 items-center gap-2.5 mb-6 w-full rounded-none hover:bg-red-100 cursor-pointer'>
              
              <LogOut className='rotate-180' color='red' size={24} />
              <p className='text-red-600'>Logout</p>
            </Button>
          </div>
        </div>
    </div>
  )
}
