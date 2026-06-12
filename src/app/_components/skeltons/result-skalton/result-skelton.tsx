import React from 'react'

export default function ResultSkelton() {
  return <>
   <div className='bg-white p-6 space-y-8'>
              <div className='h-8 bg-blue-100 rounded w-1/3 animate-pulse' />
              <div className='flex gap-4'>
                  <div className='w-1/5 space-y-4'>
                      <div className='h-32 bg-blue-50 rounded animate-pulse' />
                      <div className='h-6 bg-blue-100 rounded animate-pulse' />
                      <div className='h-6 bg-blue-100 rounded animate-pulse' />
                  </div>
                  <div className='w-4/5 space-y-4'>
                      {[...Array(3)].map((_, index) => (
                          <div key={index} className='p-4 border border-gray-200 rounded-lg bg-gray-50 animate-pulse'>
                              <div className='h-5 bg-blue-100 rounded w-1/2 mb-4' />
                              <div className='space-y-3'>
                                  <div className='h-4 bg-gray-100 rounded w-3/4' />
                                  <div className='h-4 bg-gray-100 rounded w-full' />
                                  <div className='h-4 bg-gray-100 rounded w-5/6' />
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
  </>
}
