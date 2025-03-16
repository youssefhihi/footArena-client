import { z } from "zod";


export const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  description: z.string().min(1, "Description is required"),
  isTeam: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val === "true";
      }
      return val;
    },
    z.boolean()
  ).default(false),
  logo: z.string().nullable().optional(),
});


export type CreateOrganizationRequest = z.infer<typeof createOrganizationSchema>;
