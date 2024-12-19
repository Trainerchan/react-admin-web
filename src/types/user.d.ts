export type LoginForm = {
  username: string
  password: string
}

export type AdminUser = {
  ID: number
  CreatedAt?: string
  UpdatedAt?: string
  DeletedAt?: string
  username: string
  password: string
  avator: string
}

export type User = {
  ID: number
  key?: string | number
  openid: string
  avator?: string
  username: string
  password: string
  phone: string
  count: number
  invitation_code: string
  CreatedAt?: string
  UpdatedAt?: string
  DeletedAt?: string
}

export type UserForm = {
  id?: number;
  username: string
  phone: string
  count: number
  invitation_code: string
}