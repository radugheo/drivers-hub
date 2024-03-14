import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers['x-access-token'] as string;
  if (!token) {
    return response.status(403).send({ auth: false, message: 'No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (error: any, decoded: any) => {
    if (error) {
      return response.status(500).send({ auth: false, message: 'Failed to authenticate token' });
    }
    request.body.userId = decoded.id;
    next();
  });
};
