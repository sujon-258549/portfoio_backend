import { modelMapper } from './portfolioContent.utils';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const insertOrUpdateContentIntoDB = async (
  contentType: string,
  payload: Record<string, unknown>,
) => {
  const normalizedType = String(contentType || '')
    .trim()
    .toLowerCase();

  console.log('--- Service Debug ---');
  console.log('Available Mapper Keys:', Object.keys(modelMapper));
  console.log('Requested Type:', contentType);
  console.log('Normalized Type:', normalizedType);

  // Explicitly check the mapper
  let Model;
  if (normalizedType && modelMapper[normalizedType]) {
    Model = modelMapper[normalizedType];
    console.log(
      `[Service] SUCCESS: Matched specific model for "${normalizedType}"`,
    );
  } else {
    Model = modelMapper.generic;
    console.log(
      `[Service] FALLBACK: No match for "${normalizedType}", using generic model`,
    );
  }

  if (!Model) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Content type not supported');
  }

  // Use findOneAndUpdate with upsert: true to either update the existing record or create it
  // Filter by 'type' field to identify the correct document
  const result = await Model.findOneAndUpdate({ type: contentType }, payload, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  return result;
};

const getContentFromDB = async (contentType: string) => {
  const normalizedType = contentType?.trim().toLowerCase();
  const Model = modelMapper[normalizedType] || modelMapper.generic;
  if (!Model) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Content type not supported');
  }

  const result = await Model.findOne({ type: contentType });
  return result;
};

export const PortfolioContentServices = {
  insertOrUpdateContentIntoDB,
  getContentFromDB,
};
