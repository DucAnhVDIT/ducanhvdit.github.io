import { z } from "zod";

export const step1Schema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

export type Step1FormData = z.infer<typeof step1Schema>;
