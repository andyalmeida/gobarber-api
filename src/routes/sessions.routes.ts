import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();

    const { user } = await createSessionService.execute({
      email,
      password,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userWithoutPassword } = user;

    return response.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default sessionsRouter;
