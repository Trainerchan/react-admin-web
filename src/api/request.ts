import { apiMap } from '@/config/api.config';
import { TIMEOUT } from '@/config/base.config';
import { HttpResponse } from '@/types/http';
import { message } from 'antd';
import { http } from './http';
import { ApiParams } from '@/types/api';

let loadingNum: number = 0;

export function myRequest<K extends keyof ApiParams>({ reqType, data, params }: {
  reqType: K,
  params?: ApiParams[K] extends { params: infer P } ? P : undefined,
  data?: ApiParams[K] extends { data: infer D } ? D : undefined;
}) {
  if (!(reqType in apiMap)) {
    message.error(`Requesr "${reqType}" Doesn't Exists`);
    return Promise.reject(`Request "${reqType}" Doesn't Exists`);
  }
  loadingNum++;
  window.loading(true);

  const api = apiMap[reqType]
  return new Promise<HttpResponse<ApiParams[K]['response']>>((resolve, reject) => {
    http({
      url: api.url,
      method: api.method,
      headers: api.headers || {},
      data: data || {},
      params: params || {},
      timeout: api.timeout || TIMEOUT,
      withCredentials: true,
    })
      .then((res: any) => resolve(res as HttpResponse<ApiParams[K]['response']>))
      .catch((err) => reject(err))
      .finally(() => {
        loadingNum--;
        if (loadingNum === 0) {
          window.loading(false);
        }
      });
  });
}
