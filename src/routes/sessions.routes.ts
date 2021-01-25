import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = new CreateSessionService();

  const { user, token } = await createSessionService.execute({
    email,
    password,
  });

  const { password: _, ...userWithoutPassword } = user;

  return response.status(201).json({
    user: userWithoutPassword,
    token,
  });
});

export default sessionsRouter;
