import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { createUniqueSlug } from '../../utils/slugGenerator';
import AppError from '../../errors/AppError';
import { TProject } from './project.interface';
import { Project } from './project.model';

const createProjectIntoDB = async (payload: TProject) => {
  const slug = await createUniqueSlug(Project, payload.title);
  payload.slug = slug;
  const result = await Project.create(payload);
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.find().sort({ sl: 1 });
  return result;
};

const getSingleProjectFromDB = async (idOrSlug: string) => {
  const query: any = {};
  if (Types.ObjectId.isValid(idOrSlug)) {
    query._id = idOrSlug;
  } else {
    query.slug = idOrSlug;
  }

  const result = await Project.findOne(query);
  return result;
};

const updateProjectInDB = async (id: string, payload: Partial<TProject>) => {
  const updateData = { ...payload };
  delete updateData._id;

  // Auto generate slug if title is updated
  if (updateData.title) {
    const existingProject = await Project.findById(id);
    if (existingProject) {
      updateData.slug = await createUniqueSlug(
        Project,
        updateData.title,
        existingProject.slug,
      );
    }
  }

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
