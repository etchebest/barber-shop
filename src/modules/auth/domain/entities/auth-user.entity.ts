import type { AuthRole } from './auth-role.type.js';

export interface IAuthUser {
  uid: string;
  name: string;
  email: string;
  role: AuthRole;
  companyId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
