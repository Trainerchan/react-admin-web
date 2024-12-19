import { apiMap, ApiType } from '@/config/api.config';
import { HEADER_TOKEN_KEY, TOKEN_KEY } from '@/config/base.config';
import { ErrorResponse } from '@/types/http';
import { Session } from '@/utils/storage';
import { message } from 'antd';
import axios, { AxiosError } from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let reqMap: ApiType;

http.interceptors.request.use(
  function (config) {
    console.log('reqInter->', config);
    const { url, method } = config;
    reqMap = Object.values(apiMap).filter((v: ApiType) => {
      return v.url === url && v.method.toLowerCase() === method?.toLowerCase();
    })[0];
    // rest params
    // 此处如果使用的不是axios封装好的现成的话，需要加进去，序列化params
    // if (reqMap.rest) {
    //   console.log('进去过的', url)
    //   const restSymbol = (url?.match(/:(.*)$/) as RegExpMatchArray)[1];
    //   config.url = url?.replace(/:(.*)$/, data[restSymbol]);
    //   delete config.data[restSymbol];
    // }
    if (reqMap.withToken) {
      const token = Session.get(TOKEN_KEY);
      // config.headers[HEADER_TOKEN_KEY] = 'Bearer ' + token;
      config.headers[HEADER_TOKEN_KEY] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  },
);

http.interceptors.response.use(
  function (config) {
    console.log('resInter->', config);
    if (reqMap.saveToken) {
      Session.set(TOKEN_KEY, config.data.data.token || config.headers['token']);
      if (config.data.data.token) {
        delete config.data.data.token
      }
    }
    return config.data;
  },
  function (err: AxiosError) {
    const errRes = err.response?.data as ErrorResponse;
    console.log('resError->', errRes);
    if (errRes && errRes.message) {
      message.error('Error ' + errRes.data.toString() + '. ' + errRes.message);
    } else {
      message.error(err.message);
    }
    return Promise.reject(err);
  },
);
