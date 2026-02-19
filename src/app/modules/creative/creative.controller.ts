import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CreativeServices } from './creative.service';
import { StatusCodes } from 'http-status-codes';
const createCreativeItem = catchAsync(async (req, res) => {
  const result = await CreativeServices.createCreativeItem(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Creative item created successfully',
    data: result,
  });
});

const getAllCreativeItems = catchAsync(async (req, res) => {
  const result = await CreativeServices.getAllCreativeItems();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Creative items retrieved successfully',
    data: result,
  });
});

const getCreativeItemById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CreativeServices.getCreativeItemById(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Creative item retrieved successfully',
    data: result,
  });
});

const updateCreativeItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CreativeServices.updateCreativeItem(
    id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Creative item updated successfully',
    data: result,
  });
});

const deleteCreativeItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CreativeServices.deleteCreativeItem(id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Creative item deleted successfully',
    data: result,
  });
});

export const CreativeControllers = {
  createCreativeItem,
  getAllCreativeItems,
  getCreativeItemById,
  updateCreativeItem,
  deleteCreativeItem,
};
