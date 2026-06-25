
import { GraduationCap } from 'lucide-react';
import PageTitle from '../../shared/components/page-title/page-title';
import Diploma from '@/app/_components/Diploma/get-all-deplomes';
import { getAuthToken } from '@/features/hooks/get-auth-token';



export default async function page() {
  
 const token = await getAuthToken()
 console.log(token);
  



  return <>
    <div>
      <PageTitle title="Diplomas" icon={GraduationCap} />
    </div>
    <div>

      <Diploma />

    </div>
  </>
}

