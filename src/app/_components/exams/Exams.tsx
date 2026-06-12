'use client'

import React, { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

import Image from 'next/image';
import { CircleQuestionMark, Timer, Loader, MoveRight } from 'lucide-react';
import { DiplomaType } from '@/lib/Types/Diploma';
import InfiniteScroll from 'react-infinite-scroll-component'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ExamSkelton from '../skeltons/eaxm-skelton/exam-skelton';


export default function Exams({ cardId }: { cardId: string }) {

    async function fetchExam(pageParam: number) {
        const res = await fetch(`http://localhost:3000/api/diploma/${cardId}?page=${pageParam}&limit=6`,)
        return res.json()
    }

    const {
        data,
        isLoading,
        isError,
        error,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery({
        queryKey: ['exam', cardId],
        queryFn: ({ pageParam }) => fetchExam(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const metadata = lastPage.payload?.metadata
            if (!metadata) return undefined
            const { page, totalPages } = metadata
            return page < totalPages ? page + 1 : undefined
        }
    })



    if (isLoading) {
        return <ExamSkelton />
    }

    const exams = data?.pages.flatMap(page => page.payload.data) || []

    return <>
        <div className='flex flex-col w-full'>
            <InfiniteScroll
                dataLength={exams.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={
                    <div className="bg-white p-6 flex flex-col gap-4">
                        {[...Array(3)].map((_, index) => (
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
                }
                endMessage={
                    <p className="text-center text-gray-500 my-5">
                        End of List
                    </p>
                }
            >
                <div className='bg-white p-6 flex flex-col gap-4'>
                    {exams.map((diploma: DiplomaType, index: number) => {
                        const imageUrl = diploma.image?.startsWith('/')
                            ? `https://exam-app.elevate-bootcamp.cloud${diploma.image}`
                            : diploma.image

                        return (
                            <div key={index} className="bg-blue-50 p-4 group relative hover:border-dashed hover:border-blue-200 hover:border-2 duration-300 overflow-hidden">
                                <div className="flex items-center gap-4">
                                    <div className='border border-blue-300 bg-blue-100 p-5 '>
                                        <Image
                                            src={imageUrl}
                                            alt={diploma.title}
                                            width={74}
                                            height={74}
                                            className="rounded object-cover"
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <div className='flex justify-between '>
                                            <h3 className="text-xl text-blue-600 font-semibold">{diploma.title}</h3>
                                            <div className='flex' >
                                                <div className='flex gap-1.5'>
                                                    <CircleQuestionMark size={18} />
                                                    <p className='text-sm text-gray-800 flex gap-1.5'>{10}<span>Questions</span></p>
                                                </div>
                                                <div className="w-px h-4 bg-gray-300 mx-1.5"></div>
                                                <div className='flex gap-1.5'>
                                                    <Timer size={18} />
                                                    <p className='text-sm text-gray-800 flex gap-1.5'>{diploma.duration}<span>minutes</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm  text-gray-500 mt-1.5   ">{diploma.description}</p>
                                    </div>
                                </div>
                                <Link href={`Qustions/exam/${diploma.id}?title=${diploma.title}`}>
                                    <Button className='bg-blue-600 absolute  right-2.5 bottom-2.5 rounded-none translate-y-15 group-hover:translate-y-0 hover:bg-blue-700 cursor-pointer  duration-300  w-25.5 h-7.5'>START <MoveRight /> </Button>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </InfiniteScroll>
        </div>

    </>
}
