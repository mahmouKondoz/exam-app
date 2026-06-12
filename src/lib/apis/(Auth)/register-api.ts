import { UserData } from "../../Types/UserData"


export default async function IRegister(userInfo:UserData){

    let res = await fetch('https://exam-app.elevate-bootcamp.cloud/api/auth/register' , {
        method:'POST' , 
        body:JSON.stringify(userInfo) , 
        headers:{
            'Content-Type':'application/json'
        }
    }) 
    let data = await res.json()
    return data

}