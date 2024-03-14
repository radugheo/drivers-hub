import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/User';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  all = async (req: Request, res: Response, next: NextFunction) => {
    return this.userRepository.find();
  };

  one = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return res.status(404).send('User not found');
    }
    return user;
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const userToRemove = await this.userRepository.findOneBy({ id });
    if (!userToRemove) {
      return res.status(404).send('User not found');
    }
    await this.userRepository.remove(userToRemove);
    return res.status(200).send('User removed');
  };
}
