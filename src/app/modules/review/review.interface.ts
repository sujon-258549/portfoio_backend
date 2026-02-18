export type TReview = {
  name: string;
  email: string;
  phone?: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  isActive: boolean;
  createdAt?: Date;
};

export type TOtp = {
  email: string;
  otp: string;
  expiresAt: Date;
  verified: boolean;
};
