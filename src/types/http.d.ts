export type HttpResponse<T> = {
  data: number;
  message: string;
  response: T;
};

export type ErrorResponse = {
  data: number;
  message: string;
};

export type UploadResponse = HttpResponse<{ url: string }>