'use client'
import { DiplomasType, Props } from '../../../lib/Types/get-all-diplomas'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ChevronDown, Loader } from 'lucide-react'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'
import DiplomaSkeleton from '../skeltons/Diploma-skeleton/diploma-skeleton'
import Image from 'next/image'

export const dynamic = 'force-dynamic';

export default function Diploma() {


    // let {setDiplomaInfo} = useContext()




    async function handelDiplomas(pageParam: number) {

        let res = await fetch(`/api/diploma?page=${pageParam}`)
        let data = await res.json()
        return data

    }

    let
        {
            data,
            hasNextPage,
            isLoading,
            isError,
            fetchNextPage

        }
            = useInfiniteQuery({
                queryKey: ['Diploma'],
                queryFn: ({ pageParam }) => handelDiplomas(pageParam),
                initialPageParam: 1,
                getNextPageParam: (lastPage) => {
                    let { page, totalPages } = lastPage.payload?.metadata
                    return page < totalPages ? page + 1 : undefined

                }
            })
    
    const diplomas = data?.pages.flatMap(page => page.payload.data) || []

    return (

        <div className=' '>
            {isLoading && <DiplomaSkeleton />}




            <InfiniteScroll

                dataLength={diplomas.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={
                    <div className="flex justify-center my-5">
                        <Loader className="animate-spin" />
                    </div>
                }
                endMessage={
                    <p className="text-center text-gray-500 my-5">

                    </p>
                }
            >
                <div className='grid grid-cols-3  gap-2.5 mt-10'>
                    {diplomas.map((card: DiplomasType, i) => {
                        return <div key={i}>

                            <Link
                                href={`/card/${card.id}?title=${card.title}`}
                            >
                                <div className=' w-full h-120  relative '>
                                    {/* <img className='size-full ' src={card.image} alt={card.title} /> */}
                                    
                                    <Image alt={card.title} src={card.image}fill />
                                    <div className='bg-blue-600/75  absolute top-93 bottom-2.5 right-2.5 left-2.5  '>
                                        <div className='text-white flex flex-col justify-center p-4 '>
                                            <p className='font-semibold text-xl font-[Geist Mono]'>{card.title}</p>
                                            <p className='opacity-80 font'>{card.description}

                                            </p>
                                        </div>

                                    </div>


                                </div>
                            </Link>

                        </div>

                    })}

                    <div className=' col-span-3 my-5 mx-auto  '>

                        <div className='flex flex-col items-center  '>
                            <p className='text-gray-600'>{hasNextPage ? 'Scroll to view more' : 'End of List'}</p>
                            {hasNextPage && <ChevronDown className='opacity-30 size-4.5' />}
                        </div>



                    </div>


                </div>
            </InfiniteScroll>


        </div>
    )
}
