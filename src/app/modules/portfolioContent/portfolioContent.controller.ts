import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
  const result = await PortfolioContentServices.getContentFromDB(contentType);

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
