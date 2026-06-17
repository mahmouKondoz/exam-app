'use client'
import { ProgressBar } from '@/shared/components/progress-bar/Progress-bar';
import TimerCircle from '@/shared/components/TimerCircle/TimerCircle';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IQuestionsResponse } from '@/lib/Types/qustions';
import { use, useState } from 'react';
import Result from '../Result/Result';



interface QustionsType {
  dataPromise: Promise<IQuestionsResponse>
  title: string;

}



export default function Qustions({ title, dataPromise }: QustionsType) {
  let data = use(dataPromise)
  let payload = data.payload
  let examId = payload.questions[0].examId
  let createAt = payload.questions[0].updatedAt
  const [CurrentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const currentQ = payload.questions[CurrentQuestion]
  const [result, setResult] = useState(false)
  const formattedAnswers = Object.entries(answers).map(
    ([questionId, answerId]) => ({
      questionId,
      answerId
    })
  )
  const isAnswered = !!answers[currentQ.id];
  const progress = ((CurrentQuestion + 1) / payload.questions.length) * 100

  function resetQuiz() {
    setResult(false)
    setCurrentQuestion(0)
    setAnswers({})

  }





  return <>

    {result ? <div className='bg-white mt-6 p-6'>
      <div className='w-full gap-1.5 flex flex-col'>
        <div className='flex justify-between '>
          <div className='text-gray-800'>{title} Quiz</div>
          <div className='text-gray-500'>Qustions <span className='text-blue-600 font-bold'>{CurrentQuestion + 1}</span> of {payload.questions.length}</div>
        </div>
        <div>
          <ProgressBar progress={progress} />
        </div>
      </div>
      <div>
        <Result formattedAnswers={formattedAnswers} examId={examId} createAt={createAt} resetQuiz={resetQuiz} />
      </div>
    </div> : <div className='bg-white mt-6 p-6'>
      <div className='flex items-center gap-6'>
        <div className='w-full gap-1.5 flex flex-col'>
          <div className='flex justify-between '>
            <div className='text-gray-800'>{title} Quiz</div>
            <div className='text-gray-500'>Qustions <span className='text-blue-600 font-bold'>{CurrentQuestion + 1}</span> of {payload.questions.length}</div>
          </div>
          <div>
            <ProgressBar progress={progress} />
          </div>
        </div>
        <div className="w-px h-16.25 bg-gray-300 mx-1.5"></div>
        <div>
          <TimerCircle />

        </div>
      </div>

      <div>
        <p className='text-blue-600 font-semibold text-2xl mt-10'>
          {payload.questions[CurrentQuestion].text}
        </p>
      </div>

      <div className='mt-4'>
        <RadioGroup
          value={answers[currentQ.id] || ""}
          onValueChange={(val: string) => {
            setAnswers(prev => ({
              ...prev,
              [currentQ.id]: val
            }))
          }}
          className="w-full"
        >
          {currentQ.answers.map((ans) => (
            <div
              key={ans.id}
              className="flex items-center gap-3 w-full bg-gray-50 p-6 hover:bg-gray-100"
            >
              <RadioGroupItem className=' text-blue-600 data-[state=checked]:border-blue-600' value={ans.id} id={ans.id} />
              <Label className="text-gray-800" htmlFor={ans.id}>
                {ans.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className='mt-4'>
        <div className='grid grid-cols-2 pt-6 gap-4'>
          <Button
            disabled={CurrentQuestion == 0}


            onClick={() => {
              if (CurrentQuestion > 0) {

                setCurrentQuestion(prev => prev - 1)

              }
            }}

            className={CurrentQuestion == 0 ? 'bg-gray-200 text-gray-400 w-full rounded-none hover:bg-gray-300 cursor-not-allowed h-11.5 ' : `bg-gray-200 text-gray-400 w-full rounded-none hover:bg-gray-300 cursor-pointer h-11.5  `}>
            <ChevronLeft />
            Previous
          </Button>

          <Button
            disabled={!isAnswered}

            onClick={() => {
              if (CurrentQuestion < payload.questions.length - 1) {
                setCurrentQuestion(prev => prev + 1)


              }
              if (CurrentQuestion == payload.questions.length - 1) {
                setResult(true)

              }

            }} className={` bg-blue-600 w-full rounded-none hover:bg-blue-700 cursor-pointer h-11.5`}>
            Next
            <ChevronRight />
          </Button>
        </div>
      </div>

    </div>}



  </>
}
