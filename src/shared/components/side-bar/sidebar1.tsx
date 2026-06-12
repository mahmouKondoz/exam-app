'use client'
import React, {  useState } from 'react'
import logo from '../../../../public/images/0b7894f3f9e34690bf0c8b5b2e5d087debd7b25e.png'
import Image from 'next/image'
import { GraduationCap, User, MoreVertical, LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import path from 'path'
import Link from 'next/link'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { useSession } from 'next-auth/react'


export default function Sidebar1() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  let pathname = usePathname()

  const session = useSession()
  const user = session.data?.user
  



  let userInfo =JSON.parse(localStorage.getItem('UserInfo') || 'null')
  

  const handleLogout = () => {

    router.push('/Login')
  }

  return (
    <div className='h-screen sticky top-0 bg-blue-50 w-90.5 flex flex-col overflow-y-auto'>


      <div className='mt-10  gap-2.5 ms-10 ' >
        <Image
          className="invert"
          src={logo.src}
          alt=''
          width={192}
          height={36}

        />
        <div className="flex mt-2.5 items-center w-full  ">
          <Image
            src={`/images/folder-code.png`}
            alt='logo'
            width={40}
            height={40}
          />
          <h1 className="text-xl font-bold text-blue-700  ">
            Exam App
          </h1>

        </div>


      </div>


      <div className='ms-10 mt-15'>
        <div className='text-gray-500'>
          <Link href={'/'}>
            <div className={`flex    gap-2.5 ${pathname === '/' ? ' border-blue-500 bg-blue-100 text-blue-600 p-4 w-70.5' : 'border-blue-50 p-4 w-70.5'}`}>
              <GraduationCap className=' ' />
              <p className=' '>Diplomas</p>
            </div>
          </Link>
          <Link href={'/profile'}>
            <div className={`flex gap-2.5 ${pathname === '/profile' || pathname === '/change-password'  ? 'border-blue-500 bg-blue-100 text-blue-600 p-4 w-70.5' : 'border-blue-50 p-4 w-70.5'}`}>
              <User className=' ' />
              <p className=' '>Account Settings</p>
            </div>
          </Link>

        </div>
      </div>
          

      <div className='mt-auto ms-10 mb-5'>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-3 p-4 w-70.5 hover:bg-blue-100 rounded cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-blue-0 rounded-full flex items-center justify-center  font-bold">
                <User />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{user?.firstName }</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </div>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-48 p-2 ">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 "
            >
              <LogOut className="w-4 h-4 " />
              <span>Logout</span>
            </button>
          </PopoverContent>
        </Popover>
      </div>

      
    </div>
  )
}
