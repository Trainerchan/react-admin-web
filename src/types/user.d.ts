export type LoginForm = {
  email: string
  password: string
  verifyCode: string
}

export type AdminUser = {
  id: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  username: string
  email: string
  avatarUrl: string
}

export type User = {
  id: number
  key?: string | number
  openid: string
  email: string
  avatarUrl?: string
  username: string
  phone: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export type UserForm = {
  id?: number;
  username: string
  phone: string
  email: string
}