import React from 'react'
import { NavBar } from '../../shared/components/nav-bar/nav-bar'
import Sidebar1 from '../../shared/components/side-bar/sidebar1'
import SessionPrivder from '@/shared/provider/session-provider'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionPrivder>  {/* ✅ moved to wrap everything */}
      <div className='flex'>
        <aside className='min-h-screen flex'>
          <Sidebar1 />  {/* ✅ now inside SessionProvider */}
        </aside>
        <main className='w-full'>
          <NavBar />
          <div className='bg-gray-50 min-h-screen'>
            <div className='mx-6 pt-6'>
              {children}
            </div>
          </div>
        </main>
      </div>
    </SessionPrivder>
  )
}