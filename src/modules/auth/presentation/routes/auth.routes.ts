import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

export const authRoutes = Router();

authRoutes.post('/register', AuthController.register);
