import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { CustomError } from '../models/custom-error';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[0] === 'Bearer' ? authHeader.split(' ')[1] : null;
  if (!token) {
    throw new CustomError(403, 'No token provided');
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      throw new CustomError(500, 'Failed to authenticate token');
    }
    const payload = decoded as jwt.JwtPayload;
    if (payload.id && payload.role) {
      (req as any).userId = payload.id;
      (req as any).userRole = payload.role;
      next();
    } else {
      throw new CustomError(500, 'Invalid token payload');
    }
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).userRole && (req as any).userRole === 'admin') {
    next();
  } else {
    throw new CustomError(403, 'Requires admin role');
  }
};
