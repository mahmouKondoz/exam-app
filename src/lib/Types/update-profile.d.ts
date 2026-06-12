export type UserUpdate = {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  emailVerified: boolean
  phone: string
  phoneVerified: boolean
  profilePhoto: string | null
  role: string
  createdAt: string
  updatedAt: string
}

export type UserUpdateResponse = {
  message: string
  data: {
    code: number
    payload: {
      user: UserUpdate
    }
    status: boolean
  }
}