import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectServices } from './project.service';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.createProjectIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project created successfully',
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.getAllProjectsFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Projects retrieved successfully',
    data: result,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectServices.getSingleProjectFromDB(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project retrieved successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectServices.updateProjectInDB(
    id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project updated successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectServices.deleteProjectFromDB(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project deleted successfully',
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
