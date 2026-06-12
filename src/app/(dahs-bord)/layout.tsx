import React from 'react'


import { NavBar } from '../../shared/components/nav-bar/nav-bar'
import Sidebar1 from '../../shared/components/side-bar/sidebar1'




export default function layout({ children }: { children: React.ReactNode }) {
  return <>
  
  
  
  <div className='flex '>
    <aside className='min-h-screen flex'>
      <Sidebar1/>
    </aside>
    <main className='w-full ' >
      <NavBar/>
      <div className='bg-gray-50 min-h-screen '>
        <div className='mx-6 pt-6'>
          {children}
        </div>
      </div>
    </main>
  </div>
  </>

    
   
   


  
}
