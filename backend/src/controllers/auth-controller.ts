import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CustomError } from '../models/custom-error';
import { User } from '../entities/User';

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

  register = async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      throw new CustomError(400, 'All fields are required');
    }
    const userExists = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });
    if (userExists) {
      throw new CustomError(400, 'User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });
    await this.userRepository.save(user);
    return 'User registered';
  };

  updatePassword = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError(400, 'All fields are required');
    }
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new CustomError(404, 'User not found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);
    return 'Password updated';
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError(400, 'All fields are required');
    }
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new CustomError(404, 'User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError(401, 'Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return { auth: true, token: token, id: user.id };
  };
}
