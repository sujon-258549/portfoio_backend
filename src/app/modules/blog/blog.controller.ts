import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      if (decoded.role === 'admin') {
        isAdmin = true;
      }
    } catch (err) {
      // Ignore invalid token
    }
  }

  const result = await BlogServices.getAllBlogsFromDB(isAdmin);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs retrieved successfully',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      if (decoded.role === 'admin') {
        isAdmin = true;
      }
    } catch (err) {
      // Ignore invalid token
    }
  }

  const result = await BlogServices.getSingleBlogFromDB(id as string, isAdmin);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogInDB(id as string, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogFromDB(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
