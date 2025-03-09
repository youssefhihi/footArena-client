import { z } from "zod";
import { zfd } from 'zod-form-data';
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

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
  logo: z.preprocess(
    (val) => {
      // If the input is a FileList, return the first file if available; otherwise, undefined.
      if (val instanceof FileList) {
        return val.length > 0 ? val.item(0) : null;
      }
      // In case an empty string is passed, return undefined.
      if (typeof val === "string" && val.trim() === "") {
        return undefined;
      }
      return val;
    },
    zfd.file()
    .refine(file => file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : true, {
      message: 'Only .png and .jpg files are accepted.',
    })
    .optional(),

  ),
 
});


export type CreateOrganizationRequest = z.infer<typeof createOrganizationSchema>;
