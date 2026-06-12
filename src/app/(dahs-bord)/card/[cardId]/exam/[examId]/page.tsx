import Qustions from '@/app/_components/Qusstions/Qustions';
import QuesstionSkelton from '@/app/_components/skeltons/Qusstoins-skelton/Quesstion-skelton';
import { getAuthToken } from '@/features/hooks/get-auth-token';
import PushBack from '@/shared/components/Back-arrow/Push-back';
import PageTitle from '@/shared/components/page-title/page-title';
import {  CircleQuestionMark } from 'lucide-react';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react'

interface PageProps {
  params: Promise<{ examId: string }>;
  searchParams: Promise<{ title?: string }>;
}
export default async function StartExam({ params, searchParams }: PageProps) {
  let { examId } = await params
  const searchParamsObj = await searchParams
  const title = searchParamsObj.title
  if (!title) return undefined

  let token = await getAuthToken()
  let dataPromise = fetch(`https://exam-app.elevate-bootcamp.cloud/api/questions/exam/${examId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())






  return <>
    <div className='p-6'>
      <div className='flex gap-2.5'>

        <div className='border border-blue-600 w-9.5 h-19.25 flex justify-center items-center cursor-pointer'>
          <PushBack />

        </div>

        <PageTitle title={`${title} Questions`} icon={CircleQuestionMark} />

      </div>
      <div className=''>
        <Suspense fallback={<QuesstionSkelton/>} >
          <Qustions title={title} dataPromise={dataPromise} />

        </Suspense>

      </div>
    </div>


  </>
}
