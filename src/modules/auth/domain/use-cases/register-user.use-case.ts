import type { IAuthRepository } from '../interfaces/auth.repository.interface.js';
import type { IRegisterUserDto } from '../../application/dtos/register-user.dto.js';
import type { IRegisterUserResponseDto } from '../../application/dtos/register-user-response.dto.js';

export class RegisterUserUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(input: IRegisterUserDto): Promise<IRegisterUserResponseDto> {
    const existingUser = await this.authRepository.findByEmail(input.email);

    if (existingUser) {
      throw new Error('AUTH_USER_ALREADY_EXISTS');
    }

    const createdUser = await this.authRepository.createUser(input);

    return {
      uid: createdUser.uid,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      companyId: createdUser.companyId,
      active: createdUser.active,
      createdAt: createdUser.createdAt,
    };
  }
}
