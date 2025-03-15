import { z } from "zod";

export const createUserSchema = z.object({
    fullName: z.object({
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
    }),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
  });

export type createUserFormData = z.infer<typeof createUserSchema>