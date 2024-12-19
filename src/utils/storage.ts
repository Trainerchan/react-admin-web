export const Session = {
  set(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get<T = any>(key: string) {
    // 此处如果parse错误，无法parse，那么不会抛出错误
    return JSON.parse(sessionStorage.getItem(key)!) as T;
  },
  remove(key: string) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  },
};

export const Local = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get<T = any>(key: string) {
    // 此处如果parse错误，无法parse，那么不会抛出错误
    return JSON.parse(localStorage.getItem(key)!) as T;
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
