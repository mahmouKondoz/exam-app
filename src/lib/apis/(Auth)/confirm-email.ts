import { ConfirmOtp } from "../../Types/confirm-otp";


export default async function ConfirmEmail(userOtp:ConfirmOtp){

    let res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/auth/confirm-email-verification' , {
        method:'POST' , 
        headers:{
            'Content-Type':'application/json'
        }, 
        body:JSON.stringify(userOtp)
    })

     let data = await res.json()
     return data

   
}