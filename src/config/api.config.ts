import { ApiMap } from "@/types/api";

export const apiMap: ApiMap = {
  adminLogin: {
    url: '/admin/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    saveToken: true
  },
  getCategoryList: {
    url: '/class/class_list',
    method: 'POST',
  },
  updateAndAddCategory: {
    url: '/class/class_save',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    withToken: true
  },
  deleteCategory: {
    url: '/class/class_del',
    method: 'POST'
  },
  searchModelByCategoryId: {
    url: '/class/class_list_model',
    method: 'POST',
    withToken: true
  },
  getModelList: {
    url: '/pattern/pattern_list',
    method: 'POST',
    withToken: true
  },
  deleteModelById: {
    url: '/pattern/pattern_del',
    method: 'POST',
    withToken: true
  },
  updateAndAddModel: {
    url: '/pattern/pattern_save',
    method: 'POST',
    withToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  getUserList: {
    url: '/user/user_list',
    method: 'POST',
    withToken: true
  },
  deleteUserById: {
    url: '/user/user_del',
    method: 'POST',
    withToken: true,
  },
  updateAndAddUser: {
    url: '/user/user_save',
    method: 'POST',
    withToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  },
};

