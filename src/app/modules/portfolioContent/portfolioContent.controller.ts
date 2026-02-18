import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PortfolioContentServices } from './portfolioContent.service';

const updateContent = catchAsync(async (req: Request, res: Response) => {
  const contentType = req.body.type;
  console.log('--- Debug Update Content ---');
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('ContentType:', contentType);

  const result = await PortfolioContentServices.insertOrUpdateContentIntoDB(
    contentType,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} updated successfully`,
    data: result,
  });
});

const getContent = catchAsync(async (req: Request, res: Response) => {
  const contentType = req.query.type as string;
  const token = req.headers.authorization;
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      if (decoded.role === 'admin') {
        isAdmin = true;
      }
    } catch (err) {
      // Ignore invalid token and treat as public
    }
  }

  const result = await PortfolioContentServices.getContentFromDB(
    contentType,
    isAdmin,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} retrieved successfully`,
    data: result,
  });
});

export const PortfolioContentControllers = {
  updateContent,
  getContent,
};
