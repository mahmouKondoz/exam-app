export interface IVerifyEmailResponse {
  code: string
  payload: {
    user:IUser
  }
  status:boolean

}

export interface IUser {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  emailVerified: boolean
  phone: string
  phoneVerified: boolean
  profilePhoto: string | null
  role: "USER" | "ADMIN" | string
  createdAt: string
  updatedAt: string
}