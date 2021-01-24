import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...userWithoutPassword } = user;

      return response.json(userWithoutPassword);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  },
);

export default usersRouter;
