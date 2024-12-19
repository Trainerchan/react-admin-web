export type Category = {
  ID: number;
  key?: string | number
  name: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string;
}

export type CategoryForm = {
  id?: number
  name: string;
}