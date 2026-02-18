import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TProject } from './project.interface';
import { Project } from './project.model';

const createProjectIntoDB = async (payload: TProject) => {
  const result = await Project.create(payload);
  return result;
};

const getAllProjectsFromDB = async (isAdmin: boolean = false) => {
  const query = isAdmin ? {} : { isActive: true };
  const result = await Project.find(query).sort({ sl: 1 });
  return result;
};

const getSingleProjectFromDB = async (id: string, isAdmin: boolean = false) => {
  const query = isAdmin ? { _id: id } : { _id: id, isActive: true };
  const result = await Project.findOne(query);
  return result;
};

const updateProjectInDB = async (id: string, payload: Partial<TProject>) => {
  console.log('Update Payload:', payload);
  console.log('Update ID:', id);
  const updateData = { ...payload };
  delete updateData._id;

  const result = await Project.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!');
  }

  console.log('Update Result Tags:', result.tags);
  return result;
};

const deleteProjectFromDB = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);
  return result;
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  updateProjectInDB,
  deleteProjectFromDB,
};
