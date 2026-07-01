'use client'
import DeleteAccount from '@/app/_components/delete-account/Delete-account'
import { PhoneInput } from '@/app/_components/phone-input/phone-input'
import UpdateEmail from '@/app/_components/update-email/Update-email'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserUpdateResponse } from '@/lib/Types/update-profile'
import { UpdateUserInfo } from '@/lib/Types/update-user-info'
import { useMutation } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function Profile() {

  const [isSubmit, setisSubmit] = useState(false)



  const session = useSession()
  const user = session.data?.user

  const { update } = session





  {/** Form */ }
  let form = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      profilePhoto: '',
      phone: user?.phone || ''
    }
  })

  {/** update account mutate */ }
  let { mutate, isPending: isUpdating } = useMutation({
    mutationKey: ['profile'],
    mutationFn: Onsubmit,
    onSuccess: (data: UserUpdateResponse) => {
      setisSubmit(true)
      console.log('update profile', data);
      update({
        user: {
          firstName: data.data.payload.user.firstName,
          lastName: data.data.payload.user.lastName,
          phone: data.data.payload.user.phone,
        }
      })
      setisSubmit(false)

    }
  })

  {/** update account fun */ }
  async function Onsubmit(UserNewData: UpdateUserInfo) {
    {/* covert the number from +20 to a normal number */ }
    let phone = UserNewData.phone

    phone = phone.replace(/\D/g, '')

    if (phone.startsWith('20')) {
      phone = '0' + phone.slice(2)
    }

    const UpdatedDate = {
      ...UserNewData,
      phone
    }


    let res = await fetch('/api/profile', {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(UserNewData)
    })
    let data = await res.json()
    return data




  }

  let { handleSubmit, reset } = form

  useEffect(() => {
    if (user) {


      let firstName = user.firstName ?? user.first_name ?? user.given_name ?? ''
      let lastName = user.lastName ?? user.last_name ?? user.family_name ?? ''

      // try a few other common fields
      if ((firstName === '' || lastName === '') && (user.name || user.fullName || user.full_name)) {
        const full = user.name ?? user.fullName ?? user.full_name ?? ''
        const parts = full.split(' ').filter(Boolean)
        if (!firstName) firstName = parts[0] ?? ''
        if (!lastName) lastName = parts.slice(1).join(' ') ?? ''
      }

      // final fallbacks from other available fields
      if (firstName === '' && user.username) firstName = user.username

      let phone = user.phone ?? user.telephone ?? user.mobile ?? ''

      reset({
        firstName,
        lastName,
        profilePhoto: '',
        phone
      })
    }
  }, [user, reset])





  return (
    <div>
      <form onSubmit={handleSubmit((data) => { mutate(data) })} className='p-6 mt-6 gap-4 flex flex-col'>
        <div className='flex gap-2.5'>
          <div className='w-full' >
            <Label className='mb-1.5 font-medium'>First name </Label>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <Input {...field} className='h-11.5 p-2.5' />
              )}
            />
          </div>
          <div className='w-full'>
            <Label className='mb-1.5 font-medium'>Last name </Label>
            <Controller
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <Input {...field} className='h-11.5 p-2.5' />
              )}
            />
          </div>
        </div>
        <div className='mt-2'>
          <Label className='mb-1.5 font-medium'>Username</Label>
          <Input defaultValue={user?.username} className='h-11.5 p-2.5' disabled />
        </div>

        <div className='mt-2'>
          <Label className='mb-1.5 font-medium'>
            <div className='flex w-full justify-between'>
              <p>Email</p>
              <div className='text-blue600 flex cursor-pointer'>
                <UpdateEmail />
              </div>
            </div>

          </Label>
          <Input defaultValue={user?.email} className='h-11.5 p-2.5' />
        </div>

        <div className='mt-2'>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>

                <FieldLabel className="text16">
                  Phone Number
                </FieldLabel>

                <PhoneInput

                  {...field}
                  defaultCountry="EG"
                  placeholder="Enter phone number"
                />



              </Field>
            )}
          />
        </div>

        <div className='mt-8 flex gap-3.5  '>
          <div className='w-full'>
            <DeleteAccount />
          </div>
          <div className='w-full'>
            <Button
              disabled={isUpdating}
              className={`h-11.5 rounded-none bg-blue-600 text-white font-medium hover:bg-blue-700 w-full cursor-pointer `}>{isUpdating ? <Loader className='animate-spin ' /> : 'Save Changes'}</Button>
          </div>

        </div>
      </form>

    </div>
  )
}
