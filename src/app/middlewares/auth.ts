import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: ('admin' | 'user')[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
    }

    const { role, email, iat } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
    }

    if (user.isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
    }

    if (user.status === 'blocked') {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !');
    }

    if (
      user.passwordChangedAt &&
      Math.floor(user.passwordChangedAt.getTime() / 1000) > (iat as number)
    ) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
