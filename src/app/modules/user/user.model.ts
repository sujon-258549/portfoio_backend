import { Schema, model } from 'mongoose';
import argon2 from 'argon2';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordChangedAt: { type: Date },
    role: { type: String, enum: ['admin'], default: 'admin' },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isPasswordChangeRequired: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password);
  }
});

// Post save middleware to clear password from response
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<IUser>('User', userSchema);
