import React from 'react'

export default function ExamSkelton() {
  return <>
  <div className="bg-white p-6 flex flex-col gap-4">
              {[...Array(6)].map((_, index) => (
                  <div key={`skeleton-${index}`} className="bg-blue-50 p-4 animate-pulse">
                      <div className="flex items-center gap-4">
                          <div className='border border-blue-300 bg-blue-200 p-5'>
                              <div className="w-18.5 h-18.5 bg-blue-300 rounded" />
                          </div>
                          <div className='w-full space-y-3'>
                              <div className='flex justify-between'>
                                  <div className='h-6 bg-blue-200 rounded w-1/3' />
                                  <div className='flex gap-4'>
                                      <div className='h-5 bg-blue-200 rounded w-24' />
                                      <div className='w-px h-4 bg-gray-300' />
                                      <div className='h-5 bg-blue-200 rounded w-24' />
                                  </div>
                              </div>
                              <div className='h-4 bg-blue-200 rounded w-2/3' />
                          </div>
                      </div>
                  </div>
              ))}
          </div>
  </>
}
