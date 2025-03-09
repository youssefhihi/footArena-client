import { z } from "zod"

export const createTournamentSchema = z.object({
  title: z.string().min(1, "Title must not be blank"),
  description: z.string().min(1, "Description must not be blank"),
  maxParticipants: z.number().int().positive("Max participants must be greater than zero"),
  isTeams: z.boolean(),
  startTime: z.date().min(new Date(), "Start time must be in the future"),
})

export type CreateTournamentFormData = z.infer<typeof createTournamentSchema>