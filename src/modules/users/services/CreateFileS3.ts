import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import { Request } from 'express';

interface IRequest {
  file: string;
}

@injectable()
class CreateFileS3 {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({file}: IRequest){
    
    const fileName = await this.storageProvider.saveFile(file)

    return fileName;
  }
}

export default CreateFileS3;
