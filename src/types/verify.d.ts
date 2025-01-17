export type VerifyCodeType = 'REGISTER' | 'LOGIN' | 'RESET_PWD' | 'BIND_EMAIL';

export interface VerifyCodeParams {
  email: string;
  codeType: VerifyCodeType;
}