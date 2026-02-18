export type IUser = {
  name?: string;
  photo?: string;
  bio?: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'admin';
  status: 'in-progress' | 'blocked';
  isPasswordChangeRequired: boolean;
  isDeleted: boolean;
  lastLogin?: Date;
  // Email update flow
  pendingEmail?: string;
  emailUpdateOtp?: string;
  emailUpdateOtpExpiresAt?: Date;
};
