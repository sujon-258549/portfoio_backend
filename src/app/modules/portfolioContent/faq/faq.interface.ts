export type TFAQItem = {
  id: number;
  question: string;
  answer: string;
};

export type TFAQ = {
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
  type: 'faq';
  faqs: TFAQItem[];
  slNumber?: number | string;
};
