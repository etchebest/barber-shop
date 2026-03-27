export interface IValidatedAuthToken {
  uid: string;
  email: string | null;
  role?: string;
  companyId?: string;
}

export interface IAuthTokenService {
  verifyIdToken(token: string): Promise<IValidatedAuthToken>;
}
