import { LucideIcon } from 'lucide-react'
import React from 'react'


interface PageTitleTypes {
    title:string ,
    icon : LucideIcon
   
}

export default function PageTitle({title , icon:Icon}:PageTitleTypes) {

  return <>
  <div className='w-full bg-blue-600'>

    <div className='flex p-4 items-center gap-4 text-white font-semibold'>
        <div>
            <Icon size={45}/>
        </div>
        <div>
        <p className='text-3xl'>{title}</p>
        </div>

    </div>

  </div>
  
  
  
  
  
  </>
}
