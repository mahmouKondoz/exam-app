'use client'
import { Button } from "@/components/ui/button"

 // Error boundaries must be Client Components
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex h-screen flex-col justify-center items-center gap-5">
      <h2 className="text-4xl text-red-600">Something went wrong!</h2>
      <Button className="w-40 text-yellow-300 cursor-pointer" onClick={()=>{
        reset()
      }}>Reset</Button>
    </div>
  )
}