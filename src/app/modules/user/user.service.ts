import { IUser } from './user.interface';
import { User } from './user.model';

const registerUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const getMe = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const updateMyProfile = async (email: string, payload: Partial<IUser>) => {
  const result = await User.findOneAndUpdate({ email }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserServices = {
  registerUserIntoDB,
  getMe,
  updateMyProfile,
};
