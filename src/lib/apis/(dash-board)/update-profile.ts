import { UserUpdateResponse } from "@/lib/Types/update-profile"
import { UpdateUserInfo } from "@/lib/Types/update-user-info"

export default async function UpdateProfile(UserNewData:UpdateUserInfo){

    let res = await fetch('/api/profile' , {
        method:'PATCH' , 
         
        headers:{
            'Content-Type': 'application/json'
        } , 
        body:JSON.stringify(UserNewData)
    })
    let data:UserUpdateResponse = await res.json()
    if(!data.data.status){
        throw new Error(data.message || 'Somthing went wrong')
    }
    return data

}