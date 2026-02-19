import { CreativeItem } from './creative.model';
import { TCreativeItem } from './creative.interface';

const createCreativeItem = async (payload: TCreativeItem) => {
  const result = await CreativeItem.create(payload);
  return result;
};

const getAllCreativeItems = async () => {
  const result = await CreativeItem.find().sort({ createdAt: -1 });
  return result;
};

const getCreativeItemById = async (id: string) => {
  const result = await CreativeItem.findById(id);
  return result;
};

const updateCreativeItem = async (
  id: string,
  payload: Partial<TCreativeItem>,
) => {
  const result = await CreativeItem.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteCreativeItem = async (id: string) => {
  const result = await CreativeItem.findByIdAndDelete(id);
  return result;
};

export const CreativeServices = {
  createCreativeItem,
  getAllCreativeItems,
  getCreativeItemById,
  updateCreativeItem,
  deleteCreativeItem,
};
