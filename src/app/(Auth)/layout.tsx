import { BookOpenCheck, Brain, RectangleEllipsis } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-2 h-screen'>
      <div className="relative overflow-hidden bg-linear-to-br from-[#f8fbff] via-[#e5f0ff] to-[#dbe8ff] flex flex-col justify-center items-center">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 18%), radial-gradient(circle at bottom right, rgba(59,130,246,0.12), transparent 22%)' }} />
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-blue-50 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-sky-300 opacity-30 blur-3xl" />
        <div className='relative max-w-xl w-full px-10'>
          <div className="flex gap-2 items-center w-full">
            <Image
              src={`/images/folder-code.png`}
              alt='logo'
              width={40}
              height={40}
            />
            <h1 className="text-xl font-bold text-blue-700  ">
              Exam App
            </h1>

          </div>

          <p className="mt-40 mb-15 text-3xl text-gray-800 font-bold  leading-snug">
            Empower your learning journey <br />
            with our smart exam platform.
          </p>

          <div className="space-y-10 max-w-xl">

            <div className="flex gap-5">
              <div className="size-9 border-2 border-blue-700  flex items-center justify-center">
                <Brain className="text-blue-600 size-6" />
              </div>
              <div>
                <p className="text-blue-600 text-xl font-semibold font-[Geist Mono]  ">
                  Tailored Diplomas
                </p>
                <p className="mt-2 text-gray-700 leading-relaxed ">
                  Choose from specialized tracks like <br />
                  Frontend, Backend, and Mobile Development.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="size-9 border-2 border-blue-600  flex items-center justify-center">
                <BookOpenCheck className="text-blue-600" />
              </div>
              <div>
                <p className="text-blue-600 text-xl font-semibold font-[Geist Mono]  ">
                  Focused Exams
                </p>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  Access topic-specific tests including <br />
                  HTML, CSS, JavaScript, and more.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="size-9 border-2 border-blue-600  flex items-center justify-center">
                <RectangleEllipsis  className="text-blue-600" />
              </div>
              <div>
                <p className="text-blue-600 text-xl font-semibold font-[Geist Mono]  ">
                  Smart Multi-Step Forms
                </p>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  Easily complete structured forms with a smooth, <br />
                  guided experience.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div>
        {children}

      </div>

    </div>

  )
}



