import Restpassword from "@/app/_components/reset-password-2/reset-password";
import { Suspense } from "react";

export default function CreatePassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Restpassword />
    </Suspense>
  )
}