import { z, ZodType } from 'zod';

export class MembershipValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    price: z.number().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    price: z.number().positive(),
  });

  static readonly SEARCH: ZodType = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().min(1).positive().optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
