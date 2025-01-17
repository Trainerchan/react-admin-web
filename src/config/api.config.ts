import { ApiMap } from "@/types/api";

export const apiMap: ApiMap = {
  getCaptcha: {
    url: '/public/captcha',
    method: 'GET',
  },
  sendEmailVerifyCode: {
    url: '/public/emailcode',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  adminLogin: {
    url: '/admin/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    saveToken: true
  },
  logout: {
    url: '/admin/logout',
    method: 'POST',
    withToken: true
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
    url: '/user',
    method: 'GET',
    withToken: true
  },
  deleteUserById: {
    url: '/user',
    method: 'DELETE',
    withToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  updateAndAddUser: {
    url: '/user',
    method: 'PUT',
    withToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  getArticleList: {
    url: '/article/list',
    method: 'GET',
    withToken: true
  },
  deleteArticleByIds: {
    url: '/article/delete',
    method: 'DELETE',
    withToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  addArticle: {
    url: '/article/add',
    method: 'POST',
    withToken: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

