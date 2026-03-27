import type { IAuthUser } from '../entities/auth-user.entity.js';
import type { IRegisterUserDto } from '../../application/dtos/register-user.dto.js';

export interface IAuthRepository {
  createUser(data: IRegisterUserDto): Promise<IAuthUser>;
  findByUid(uid: string): Promise<IAuthUser | null>;
  findByEmail(email: string): Promise<IAuthUser | null>;
}
