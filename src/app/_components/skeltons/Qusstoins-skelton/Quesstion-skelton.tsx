import React from 'react'

export default function QuesstionSkelton() {
  return <>
  
  {
          <div className='bg-white mt-6 p-6 animate-pulse'>
            <div className='flex items-center gap-6'>
              <div className='w-full gap-1.5 flex flex-col'>
                <div className='flex justify-between'>
                  <div className='h-6 bg-blue-200 rounded w-1/4'></div>
                  <div className='h-5 bg-gray-200 rounded w-1/3'></div>
                </div>
                <div className='h-2 bg-gray-200 rounded w-full mt-2'></div>
              </div>
              <div className="w-px h-16.25 bg-gray-300 mx-1.5"></div>
              <div className='w-20 h-20 bg-blue-200 rounded-full'></div>
            </div>

            <div className='mt-8 space-y-6'>
              <div className='space-y-4'>
                <div className='h-6 bg-blue-200 rounded w-3/4'></div>
                <div className='space-y-3'>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className='flex items-center space-x-3'>
                      <div className='w-4 h-4 bg-gray-200 rounded-full'></div>
                      <div className='h-5 bg-gray-200 rounded w-2/3'></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex justify-between items-center pt-6'>
                <div className='h-10 bg-gray-200 rounded w-24'></div>
                <div className='h-10 bg-blue-200 rounded w-24'></div>
              </div>
            </div>
          </div>
        }
  
  </>
}
