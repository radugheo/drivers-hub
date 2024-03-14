import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user';
import { CustomError } from '../models/custom-error';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  all = async (req: Request, res: Response) => {
    const users = await this.userRepository.find();
    return users;
  };

  one = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new CustomError(404, 'User not found');
    }
    return user;
  };

  remove = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const userToRemove = await this.userRepository.findOneBy({ id });
    if (!userToRemove) {
      throw new CustomError(404, 'User not found');
    }
    await this.userRepository.remove(userToRemove);
    return 'User removed';
  };
}
