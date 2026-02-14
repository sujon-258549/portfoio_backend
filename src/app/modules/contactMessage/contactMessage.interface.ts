export type TContactMessage = {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
};
