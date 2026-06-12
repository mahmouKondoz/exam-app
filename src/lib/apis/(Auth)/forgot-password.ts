
export default async function ForgotPasswordApi(email:string){
    const res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/auth/forgot-password' , {
        method:'POST' , 
        headers:{
            'Content-Type':'application/json'
        } , 
        body:JSON.stringify({
            email ,
            redirectUrl:`${window.location.origin}/reset-password`
        })
    }) 
    const data = await res.json()

    return data
}


