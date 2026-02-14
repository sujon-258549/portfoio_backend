import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ContactMessageServices } from './contactMessage.service';

const createContactMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactMessageServices.createContactMessageInDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Message sent successfully',
    data: result,
  });
});

const getAllContactMessages = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ContactMessageServices.getAllContactMessagesFromDB();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Messages retrieved successfully',
      data: result,
    });
  },
);

export const ContactMessageControllers = {
  createContactMessage,
  getAllContactMessages,
};
