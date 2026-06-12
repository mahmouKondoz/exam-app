'use client'
import { IResultsResponse } from '@/lib/Types/Results'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResultAnalysis } from '@/shared/components/Result-analysis/Result-analysis'
import ResultSkelton from '../skeltons/result-skalton/result-skelton'
import { Button } from '@/components/ui/button'
import { FolderSearch, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
interface ResultType {
    formattedAnswers: {
        questionId: string
        answerId: string
    }[]
    examId: string,
    createAt: string,
    resetQuiz?:()=>void
   
    
}

export default function Result({ formattedAnswers, examId, createAt  , resetQuiz}: ResultType  ) {

    const route = useRouter()


    async function handelResult({ formattedAnswers, examId, createAt }: ResultType) {
        let res = await fetch('http://localhost:3000/api/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                examId: examId,
                answers: formattedAnswers,
                startedAt: createAt
            })
        })
        let payload: IResultsResponse = await res.json()
        return payload

    }




    let { mutate, data: answers, isPending } = useMutation({
        mutationKey: ['result'],
        mutationFn: handelResult,
        onSuccess: (data) => {
            // console.log(data);

        },
        onError:(error)=>{
            console.log(error);
            
        }



    })


    useEffect(() => {
        mutate({ formattedAnswers, examId, createAt })

    }, [])

    const correctAnswer = answers?.data?.payload.submission.correctAnswers
    const wrongAnswer = answers?.data?.payload.submission.wrongAnswers


    if (isPending) {
        return <ResultSkelton/>
    }
   


    return <>

        <div>

        {/* header */}

            <div>
                <p className='text-blue-600 text-2xl mt-10 font-bold'>Results:</p>
            </div>

              {/* body */}

            <div className='flex   h-150 w-full bg-white mt-4 gap-4 ' >

                <div className=' w-1/5   border border-blue-200 bg-blue-50 flex flex-col items-center justify-center p-6'>
                    <div className='p-9'>
                        <div>
                            <ResultAnalysis wrongAnswer={wrongAnswer!} correctAnswer={correctAnswer!} />
                        </div>
                        <div className="mt-6 ms-35">
                            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500" /> Correct: {correctAnswer}</div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500" /> Incorrect: {wrongAnswer}</div>
                        </div>
                    </div>

                </div>
                <div className='w-3/4 overflow-y-auto  border border-dashed border-blue-200  p-4 space-y-6 scrollbar-thin scrollbar-thumb-blue-200'>
                    {/* answer correction */}
                    {
                        answers?.data?.payload.analytics.filter((wrongAnswers) => !wrongAnswers.isCorrect).map((answer) => {
                            return <div className=''>
                                <p className='text-[20px] text-blue-600 font-bold'>{answer.questionText}</p>
                                <RadioGroup defaultValue={answer.selectedAnswer.text} className="w-full mt-2.5">
                                    <div className="flex items-center gap-3 border  p-4 bg-red-50">
                                        <RadioGroupItem className=' text-red-600 data-[state=checked]:border-red-600' defaultChecked value={answer.selectedAnswer.text} id={answer.selectedAnswer.text} />
                                        <Label htmlFor={answer.selectedAnswer.id}>{answer.selectedAnswer.text}</Label>

                                    </div>
                                    <div className="flex items-center gap-3 border  p-4 bg-emerald-50">
                                        <RadioGroupItem disabled value={answer.correctAnswer.id} id={answer.correctAnswer.id} />
                                        <Label htmlFor={answer.correctAnswer.id}>{answer.correctAnswer.text}</Label>
                                    </div>
                                </RadioGroup>

                            </div>

                        })
                    }
                </div>

            </div>

              {/* bottom */}

              <div>
                <div className='flex gap-4 pt-6 mt-4 '>
                   <div className='w-full'>
                     <Button onClick={()=>{
                        resetQuiz!()
                        }} className='bg-gray-200 w-full rounded-none cursor-pointer hover:bg-gray-300 h-11.5'>
                         <RotateCcw color='gray' size={18} />
                             <p className='text-sm text-gray-800 '>Restart</p>
                            
                    </Button>
                   </div>
                   <div className='w-full'>
                     <Button onClick={()=>{route.back()}}  className='bg-blue-600 rounded-none cursor-pointer hover:bg-blue-700 h-11.5 w-full'>
                         <FolderSearch size={18} />
                             <p className='text-sm text-white'>Explore</p>
                            
                    </Button>
                   </div>
                </div>
              </div>


        </div>

    </>
}
