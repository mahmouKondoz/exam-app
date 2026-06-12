'use client'
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TriangleAlert, X } from 'lucide-react';



export default function DeleteAccount() {


  async function deleteAcount() {
    let res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/users/account', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzN2E5MDJlYy1kNmIyLTQyOTUtYTA2Mi00OTNiNDk5ZGY3ZTgiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3NzU2MjI1NywiZXhwIjoxNzc4MTY3MDU3fQ.Bt0eg6uqMNxnA2Dq4aw53uGCaZiMwNhGpLcQ08xT8t4`
      }
    })
    let data = await res.json()
    return data
  }

  const { mutate } = useMutation({
    mutationKey: ['deleteAccount'],
    mutationFn: deleteAcount,
    onSuccess: (data) => {

      console.log(data);

    }
  })


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='h-11.5 bg-red-50 text-red-600 font-medium hover:bg-red-100 cursor-pointer w-full rounded-none ' >Delete My Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='flex flex-col justify-center items-center p-9  gap-9'>
        <div className='size-27.5 bg-red-50 rounded-full flex justify-center items-center'>
          <div className='size-20 bg-red-100 rounded-full flex justify-center items-center'>
            <TriangleAlert color='red' size={50} strokeWidth={1.3} />
          </div>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-red-600'>Are you sure you want to delete your account?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter >
          <AlertDialogCancel className='rounded-none h-11.5 bg-gray-200 w-54.25 me-2.5'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='rounded-none h-11.5 bg-red-600  w-54.25' onClick={() => { mutate() }}>Yes, delete</AlertDialogAction>
        </AlertDialogFooter>
        <div>
          <AlertDialogCancel  className='top-3.5 absolute right-3.5 cursor-pointer border-none rounded-none hover:bg-white  '>
            <X strokeWidth={1} size={18} />
          </AlertDialogCancel>

        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
