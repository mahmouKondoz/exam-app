

export interface IError{
    
        status:boolean ,
        
        code:number ,
        message:string ,
        errors ?:[{
            path:string ,
            message:string
        }]
}

