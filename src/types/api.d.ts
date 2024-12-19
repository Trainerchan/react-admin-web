import { Category, CategoryForm } from "./category";
import { Model, ModelForm } from "./model";
import { AdminUser, LoginForm, User, UserForm } from "./user";

export interface ApiParams {
  adminLogin: { data: LoginForm, response: AdminUser };
  getCategoryList: { response: Category[] };
  updateAndAddCategory: { data: CategoryForm, response: any };
  deleteCategory: { params: { id: number }, response: any };
  searchModelByCategoryId: { params: { id: number }, response: Model[] };
  getModelList: { response: Model[] };
  deleteModelById: { params: { id: number }, response: any };
  updateAndAddModel: { data: ModelForm, response: any };
  getUserList: { response: User[] };
  deleteUserById: { params: { id: number }, response: any };
  updateAndAddUser: { data: UserForm, response: any }
}

export type ApiMap = {
  [K in keyof ApiParams]: ApiType;
}

export interface ApiType {
  url: string;
  method:
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD'
  | 'TRACE'
  | 'CONNECT';
  headers?: RequestHeaders;
  timeout?: number;
  withToken?: boolean;
  saveToken?: boolean;
}

export interface RequestHeaders {
  'Content-Type'?:
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain'
  | 'text/html';
  [key: string]: any;
}