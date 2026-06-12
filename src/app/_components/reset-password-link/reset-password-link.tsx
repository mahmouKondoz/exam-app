import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MoveLeft } from 'lucide-react';
import Link from 'next/link'


export default function ResetPasswordLink({email , setIssent}:{email:string , setIssent:(x:boolean)=>void}) {
    
    
    
     return <>
  
   <div className="flex justify-center items-center h-screen">
                <Card className="w-[60%] border-0 shadow-none">
                    <CardHeader className='mb-4'>
                     <div onClick={()=>{setIssent(false)}} className='border border-gray-200 size-10 flex justify-center items-center mb-10 cursor-pointer'>
                          <MoveLeft size={24} color='black'/>
                     </div>
                        <CardTitle className="text-4xl font-bold ">Password Reset Sent</CardTitle>
                      
                    </CardHeader>

                    <CardContent>
                        <p className='text-gray-800 flex flex-col gap-3'>
                            We have sent a password reset link to:
                             <span className='text-blue-600'>{email}.</span>
                             <span className='text-gray-800 py-2.5'>
                            Please check your inbox and follow the instructions to reset your password.
                             </span> 
                             <span className='text-sm text-gray-500'>
                                    If you don’t see the email within a few minutes, check your spam or junk folder.
                             </span>
                        </p>
                      
                    </CardContent>

                    <CardFooter className=' mt-10'>
                        <p className='text-gray-500 '>Don't have an account? <Link className='text-blue-600' href={'Register'}>Create yours</Link></p>
                       

                    </CardFooter>
                    
                </Card>
            </div>
  
  
  </>
  }