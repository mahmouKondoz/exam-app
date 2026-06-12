'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function PushBack() {
    let router = useRouter()
  return <>
  <ChevronLeft onClick={()=>{
    router.back()
  }} className='text-gray-400' size={24} />
  </>
}
