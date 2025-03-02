import { z } from "zod";
const authSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional(), // Only required for Sign Up
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export { authSchema };
