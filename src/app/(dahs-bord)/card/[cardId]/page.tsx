import Exams from '@/app/_components/exams/Exams';

import PushBack from '@/shared/components/Back-arrow/Push-back';
import PageTitle from '@/shared/components/page-title/page-title';
import { BookOpenCheck, ChevronLeft } from 'lucide-react';


interface PageProps {
  params: Promise<{ cardId: string }>;
  searchParams: Promise<{ title?: string }>;
}
export default async function DiplomaExams(
  { params, searchParams }: PageProps
) {

  const { cardId } = await params
  const searchParamsObj = await searchParams
  const title = searchParamsObj.title
  






  return <>
    <div>
      <div className='flex gap-2.5'>
        
          <div className='border border-blue-600 w-9.5 h-19.25 flex justify-center items-center cursor-pointer'>
             <PushBack/>
          </div>
    
        <PageTitle title={title || 'Diploma Details'} icon={BookOpenCheck} />

      </div>

      <div className='mt-6'>
        <Exams cardId={cardId} />
      </div>

    </div>
  </>
}
