import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { User } from '../entities/User';
import { CustomError } from '../models/custom-error';
import { Car } from '../entities/Car';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private carRepository = AppDataSource.getRepository(Car);

  all = async (req: Request, res: Response) => {
    return this.userRepository.find();
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
    const cars = await this.carRepository.find({ where: { owner: userToRemove } });
    for (let car of cars) {
      car.owner = null;
      await this.carRepository.remove(car);
    }
    await this.userRepository.remove(userToRemove);
    return 'User removed';
  };
}
