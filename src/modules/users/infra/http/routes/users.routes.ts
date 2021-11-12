import { Router, Request, Response } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { container } from 'tsyringe';
import CreateFileS3 from '@modules/users/services/CreateFileS3';


const multerConfig = multer();

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const userAvatarController = new UserAvatarController();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

// usersRouter.post('/uploadFusion', multerConfig.single('file'),  usersController.upload);

// usersRouter.post('/uploadFusion', multerConfig.single('file'), userAvatarController.update)


usersRouter.post('/uploadFusion', multerConfig.single('file'), async (req: Request, res: Response) => {
  console.log(req.file.buffer.toString("utf-8"));
})

export default usersRouter;
