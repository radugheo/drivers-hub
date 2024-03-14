import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

  register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).send('All fields are required');
    }
    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      res.status(400).send('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = this.userRepository.create({
        username,
        email,
        password: hashedPassword,
        role: 'user',
      });
      await this.userRepository.save(user);
      res.status(201).send('User registered');
    } catch (error: any) {
      res.status(500).send(`There was a problem registering the user: ${JSON.stringify(error)}`);
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send('All fields are required');
    }
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      res.status(404).send('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).send({ auth: true, token: token });
  };
}
