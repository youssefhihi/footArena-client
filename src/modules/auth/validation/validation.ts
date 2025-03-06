import { z } from 'zod';

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  fullName: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required')
  }),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(4, 'Password must be at least 4 characters')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/, 
      'Password must contain both letters and numbers'),
  passwordConfirmation: z.string(),
    }).refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ['passwordConfirmation'],
});
export const resetPasswordSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or email is required'),
});

export const updatePasswordSchema = z.object({
  newPassword: z.string()
    .min(4, 'Password must be at least 4 characters')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/, 
      'Password must contain both letters and numbers'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});