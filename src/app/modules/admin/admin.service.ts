import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const getAllUsersFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  if (user.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is already deleted!');
  }

  return user;
};

const blockUserIntoDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  if (user.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is already deleted!');
  }

  const newStatus = user.status === 'blocked' ? 'in-progress' : 'blocked';

  const result = await User.findByIdAndUpdate(
    id,
    { status: newStatus },
    { new: true, runValidators: true },
  );

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  if (user.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is already deleted!');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  return result;
};

export const AdminServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  blockUserIntoDB,
  deleteUserFromDB,
};
