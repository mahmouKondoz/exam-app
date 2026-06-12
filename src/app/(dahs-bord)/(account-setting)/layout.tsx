import { Sidebar } from '@/components/ui/sidebar';
import { NavBar } from '@/shared/components/nav-bar/nav-bar';
import PageTitle from '@/shared/components/page-title/page-title'
import SettingSideBar from '@/shared/components/settings-side-bar/setting-side-bar';
import Sidebar1 from '@/shared/components/side-bar/sidebar1';
import { CircleUserRound, GraduationCap, Lock, LogOut, UserRound } from 'lucide-react'
import React from 'react'




export default function AccountSetting({children}:{children:React.ReactNode}) {


  return <>
 
 <PageTitle title="Account Settings" icon={UserRound} />
  <div className='flex '>
      <div className='flex mt-6 h-230 gap-6 w-full'>
        {/* RIGTH SIDE */}
        <SettingSideBar/>

        {/* LEFT SIDE */}

        <div className='w-full  bg-white'>
          {children}
          
        </div>
      </div>


    </div>
        
  </>
}


