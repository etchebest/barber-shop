import type { Request, Response } from 'express';
import { registerUserSchema } from '../validators/register-user.validator.js';
import { FirebaseAuthRepository } from '../../infrastructure/repositories/firebase-auth.repository.js';
import { RegisterUserUseCase } from '../../domain/use-cases/register-user.use-case.js';

export class AuthController {
  static async register(request: Request, response: Response): Promise<Response> {
    const parsedBody = registerUserSchema.safeParse(request.body);

    if (!parsedBody.success) {
      return response.status(400).json({
        success: false,
        data: null,
        error: {
          code: 'VALIDATION_ERROR',
          details: parsedBody.error.flatten(),
        },
      });
    }

    const authRepository = new FirebaseAuthRepository();
    const registerUserUseCase = new RegisterUserUseCase(authRepository);

    const result = await registerUserUseCase.execute(parsedBody.data);

    return response.status(201).json({
      success: true,
      data: result,
      error: null,
    });
  }
}
