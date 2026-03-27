import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRoutes } from './modules/auth/presentation/routes/auth.routes.js';
import { auth } from './shared/config/firebase.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.get('/health', (_request, response) => {
  return response.status(200).json({
    success: true,
    data: {
      status: 'ok',
    },
    error: null,
  });
});

app.get('/auth/test', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({ error: 'NO_TOKEN' });
  }

  console.log('Passou!');

  try {
    const decoded = await auth.verifyIdToken(token);

    return res.json({
      success: true,
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      error: 'INVALID_TOKEN',
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
