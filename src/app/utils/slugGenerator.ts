import { Model } from 'mongoose';

export const generateSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
};

export const createUniqueSlug = async (
  model: Model<any>,
  title: string,
  existingSlug?: string,
): Promise<string> => {
  const slug = generateSlug(title);
  let uniqueSlug = slug;
  let counter = 1;

  // If updating and the slug hasn't changed, return the existing one
  if (existingSlug && existingSlug === slug) {
    return existingSlug;
  }

  while (await model.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};
