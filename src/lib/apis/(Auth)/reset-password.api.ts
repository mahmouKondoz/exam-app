import { respasswordType } from "@/lib/Types/reset-password";


export default async function RestPasswordApi(newPassword:respasswordType){
    const res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/auth/reset-password' , {
        method:'POST' , 
        headers:{
            'Content-Type':'application/json'
        } , 
        body:JSON.stringify(newPassword)
    }) 
    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message || "Something went wrong")
    }
    return data

}