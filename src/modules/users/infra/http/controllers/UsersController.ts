import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import CreateFileS3 from '@modules/users/services/CreateFileS3';

import { classToClass } from 'class-transformer';



export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }

  // public async upload(request: Request, response: Response): Promise<Response> {
  //   const createFileS3 = container.resolve(CreateFileS3);
  //   const { cargas, file } = request.body;
  //   console.log(file)
  //   const add = await createFileS3.execute({
  //     file: request.file.filename
  //   })

  //   return response.send();
  // }
}


// import { Request, Response } from 'express';
// import { container } from 'tsyringe';
// import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
// import { classToClass } from 'class-transformer';

// export default class UserAvatarController {
//   public async update(request: Request, response: Response): Promise<Response> {
//     const updateUserAvatar = container.resolve(UpdateUserAvatarService);
//     const user = await updateUserAvatar.execute({
//       user_id: request.user.id,
//       avatarFilename: request.file.filename,
//     });

//     return response.json(classToClass(user));
//   }
// }
