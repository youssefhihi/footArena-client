export interface FullName {
    firstName: string
    lastName: string
  }
  
  export enum Role {
    ADMIN = "ADMIN",
    PLAYER = "PLAYER",
  }
  
  export interface User {
    id: string
    fullName: FullName
    username: string
    email: string
    phoneNumber?: string
    role: Role
    isVerified: boolean
    profileImage?: string
    createdAt: string
    deletedAt: string
  }
  
  export interface LoginRequest {
    usernameOrEmail: string
    password: string
  }
  
  export interface LoginResponse {
    token: string
    expiresIn: number
    user: User
  }
  
  export interface RegisterRequest {
    fullName: FullName
    username: string
    email: string
    password: string
  }
  
  export interface ResetPasswordRequest {
    usernameOrEmail: string
  }
  
  export interface UpdatePasswordRequest {
    newPassword: string
    token: string
  }
  
