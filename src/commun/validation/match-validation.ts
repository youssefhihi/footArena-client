import { z } from "zod"

export const generateMatchesSchema = z.object({
    startTime: z
      .string()
      .nonempty("Start time is required")
      .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
    intervalDays: z
      .number()
      .int("Must be an integer")
      .min(1, "Interval days must be at least 1"),
    matchesPerDay: z
      .number()
      .int("Must be an integer")
      .min(1, "Must have at least 1 match per day"),
    roundGapHours: z
      .number()
      .int("Must be an integer")
      .min(1, "Round gap must be at least 1 hour"),
});
export const updateMatchSchema = z.object({
  comments: z.string().optional(),
  matchResult: z.object({
    participant1: z.coerce.number().int().min(0, "Score must be a positive number or zero"), // Changed
    participant2: z.coerce.number().int().min(0, "Score must be a positive number or zero"), // Changed
  }),
  carts: z.object({
    participant1: z.object({
      yellow: z.coerce.number().int().min(0, "Must be a positive number or zero"), // Changed
      red: z.coerce.number().int().min(0, "Must be a positive number or zero"), // Changed
    }),
    participant2: z.object({
      yellow: z.coerce.number().int().min(0, "Must be a positive number or zero"), // Changed
      red: z.coerce.number().int().min(0, "Must be a positive number or zero"), // Changed
    }),
  }),
});

export type GenerateMatchesFormData = z.infer<typeof generateMatchesSchema>
export type updateMatchFormData = z.infer<typeof updateMatchSchema>