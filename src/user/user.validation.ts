import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(1).max(100),
    email: z.string().min(1).max(100).email(),
    password: z.string().min(1).max(100),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().min(1).max(100).email(),
    password: z.string().min(1).max(100),
  });

  static readonly GET: ZodType = z.object({
    username: z.string().min(1).max(100),
    email: z.string().min(1).max(100).email(),
  });

  static readonly UPDATE: ZodType = z.object({
    username: z.string().min(1).max(100).optional(),
    // email: z.string().min(1).max(100).email().optional(),
    password: z.string().min(1).max(100).optional(),
  });
}
