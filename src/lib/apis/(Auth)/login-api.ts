import { TLoginData } from "../../Types/login-data";



export default async function ILogin(LoginData:TLoginData){
    let res = await fetch('/api/login' , {
        method:'POST' , 
        body:JSON.stringify(LoginData) , 
        headers:{
            'Content-Type':'application/json'
        }
    })
    let data = await res.json()
    return data
}