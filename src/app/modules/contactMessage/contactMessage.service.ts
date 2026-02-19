import config from '../../config';
import { contactNotificationTemplate, sendEmail } from '../../utils/sendEmail';
import { TContactMessage } from './contactMessage.interface';
import { ContactMessage } from './contactMessage.model';

const createContactMessageInDB = async (payload: TContactMessage) => {
  const result = await ContactMessage.create(payload);

  // Send email notification to admin
  try {
    const emailHtml = contactNotificationTemplate({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: payload.message,
    });

    await sendEmail(
      config.email_user || 'sujon.fullstack@gmail.com',
      emailHtml,
      `📬 New Contact: ${payload.subject} — from ${payload.name}`,
      payload.email,
      payload.name,
    );
  } catch (error) {
    // Log the error but don't fail the request
    console.error('Failed to send contact notification email:', error);
  }

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
