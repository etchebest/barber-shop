import type { AuthRole } from '../../domain/entities/auth-role.type.js';

export interface IRegisterUserDto {
  name: string;
  email: string;
  password: string;
  role: AuthRole;
  companyId: string;
}
