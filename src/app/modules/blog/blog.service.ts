import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { createUniqueSlug } from '../../utils/slugGenerator';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const slug = await createUniqueSlug(Blog, payload.title);
  payload.slug = slug;
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogsFromDB = async (isAdmin: boolean) => {
  const query = isAdmin ? {} : { isActive: true };
  const result = await Blog.find(query).sort({ createdAt: -1 });
  return result;
};

const getSingleBlogFromDB = async (idOrSlug: string, isAdmin: boolean) => {
  const query: any = isAdmin ? {} : { isActive: true };

  if (Types.ObjectId.isValid(idOrSlug)) {
    query._id = idOrSlug;
  } else {
    query.slug = idOrSlug;
  }

  const result = await Blog.findOne(query);
  return result;
};

const updateBlogInDB = async (id: string, payload: Partial<TBlog>) => {
  const updateData = { ...payload };
  // delete updateData._id; // Mongoose handles this usually but good to be safe if user sends it

  const result = await Blog.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
  }

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
};
