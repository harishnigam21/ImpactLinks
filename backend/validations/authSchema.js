import { z } from "zod";
export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  charityId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid Charity ID format" }),
  contributionPct: z
    .number()
    .min(10, { message: "Contribution must be at least 10%" })
    .optional()
    .default(10),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
