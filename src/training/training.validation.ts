import { z, ZodType } from 'zod';

export class TrainingValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    image: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    image: z.string().min(1).max(100),
  });

  static readonly SEARCH: ZodType = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    image: z.string().min(1).max(100).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
