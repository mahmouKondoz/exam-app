import { Loader } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='flex justify-center items-center animate-spin my-100'>
            <Loader size={50}  />
    
        </div>
  )
}
