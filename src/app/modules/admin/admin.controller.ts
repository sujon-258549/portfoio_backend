import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All users retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await AdminServices.getSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await AdminServices.blockUserIntoDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User status updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await AdminServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllUsers,
  getSingleUser,
  blockUser,
  deleteUser,
};
