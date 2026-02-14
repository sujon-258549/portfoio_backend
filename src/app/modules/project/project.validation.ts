import { z } from 'zod';

const projectTechnologiesValidationSchema = z.object({
  frontend: z.array(z.string()),
  backend: z.array(z.string()),
  database: z.array(z.string()),
  tools: z.array(z.string()),
});

const projectSolutionValidationSchema = z.object({
  image: z.string().optional(),
  text: z.string(),
});

const projectStatValidationSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const projectDetailedDescriptionValidationSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const createProjectValidationSchema = z.object({
  body: z.object({
    _id: z.string().optional(),
    title: z.string(),
    category: z.string(),
    thumbnail: z.string(),
    image: z.string(),
    imageName: z.string().optional(),
    shortDescription: z.string(),
    longDescription: z.string(),
    features: z.array(z.string()),
    technologies: projectTechnologiesValidationSchema,
    liveUrl: z.string(),
    githubUrl: z.string(),
    challenges: z.array(z.string()),
    solutions: z.array(projectSolutionValidationSchema),
    duration: z.string(),
    role: z.string(),
    teamMembers: z.array(z.string()),
    tags: z.array(z.string()),
    stats: z.array(projectStatValidationSchema),
    problem: z.string(),
    plan: z.string(),
    detailedDescriptions: z
      .array(projectDetailedDescriptionValidationSchema)
      .default([]),
    gallery: z.array(z.string()),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    thumbnail: z.string().optional(),
    image: z.string().optional(),
    imageName: z.string().optional(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    features: z.array(z.string()).optional(),
    technologies: projectTechnologiesValidationSchema.optional(),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    challenges: z.array(z.string()).optional(),
    solutions: z.array(projectSolutionValidationSchema).optional(),
    duration: z.string().optional(),
    role: z.string().optional(),
    teamMembers: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    stats: z.array(projectStatValidationSchema).optional(),
    problem: z.string().optional(),
    plan: z.string().optional(),
    detailedDescriptions: z
      .array(projectDetailedDescriptionValidationSchema)
      .optional(),
    gallery: z.array(z.string()).optional(),
  }),
});

export const ProjectValidations = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
