export type Model = {
  ID: number
  key?: string | number
  CreatedAt?: string
  UpdatedAt?: string
  DeletedAt?: string
  name: string
  logo: string
  class_id: number
}

export type ModelForm = {
  id?: number
  name: string
  class_id: number
  logo: string
}