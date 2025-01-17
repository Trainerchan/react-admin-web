export type HttpResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type ErrorResponse = {
  code: number;
  message: string;
};

export type UploadResponse = HttpResponse<{ url: string }>

export type CaptchaResponseData = {
  captchaId: string;
  imageBase64: string;
}