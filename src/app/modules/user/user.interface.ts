export type IUser = {
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'admin';
  status: 'in-progress' | 'blocked';
  isPasswordChangeRequired: boolean;
  isDeleted: boolean;
  lastLogin?: Date;
};
