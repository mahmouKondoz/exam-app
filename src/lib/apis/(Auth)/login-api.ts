import { TLoginData } from "../../Types/login-data";



export default async function ILogin(LoginData:TLoginData){
    let res = await fetch('http://localhost:3000/api/login' , {
        method:'POST' , 
        body:JSON.stringify(LoginData) , 
        headers:{
            'Content-Type':'application/json'
        }
    })
    let data = await res.json()
    return data
}