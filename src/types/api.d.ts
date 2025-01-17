import { Category, CategoryForm } from "./category";
import { CaptchaResponseData } from "./http";
import { Model, ModelForm } from "./model";
import { AdminUser, LoginForm, User, UserForm } from "./user";
import { VerifyCodeParams } from "./verify";
import { ArticleForm } from "./article";

export interface ApiParams {
  getCaptcha: { response: CaptchaResponseData };
  sendEmailVerifyCode: { data: VerifyCodeParams, response: any };
  adminLogin: { data: LoginForm, response: AdminUser };
  logout: { response: any };
  getCategoryList: { response: Category[] };
  updateAndAddCategory: { data: CategoryForm, response: any };
  deleteCategory: { params: { id: number }, response: any };
  searchModelByCategoryId: { params: { id: number }, response: Model[] };
  getModelList: { response: Model[] };
  deleteModelById: { params: { id: number }, response: any };
  updateAndAddModel: { data: ModelForm, response: any };
  getUserList: { response: User[] };
  deleteUserById: { params: { id: number }, response: any };
  updateAndAddUser: { data: UserForm, response: any };
  getArticleList: { response: Article[] };
  deleteArticleByIds: { data: { ids: number[] }, response: any };
  addArticle: { data: ArticleForm, response: any };
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