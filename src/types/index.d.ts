export interface LoginParams {
  clientID: string;
  clientSecret: string;
}

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}
