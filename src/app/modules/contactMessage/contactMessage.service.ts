import { TContactMessage } from './contactMessage.interface';
import { ContactMessage } from './contactMessage.model';

const createContactMessageInDB = async (payload: TContactMessage) => {
  const result = await ContactMessage.create(payload);
  return result;
};

const getAllContactMessagesFromDB = async () => {
  const result = await ContactMessage.find().sort({ createdAt: -1 });
  return result;
};

export const ContactMessageServices = {
  createContactMessageInDB,
  getAllContactMessagesFromDB,
};
