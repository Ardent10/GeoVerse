import { z } from "zod";
const authSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional(),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

const guessForm = z.object({
  guess: z
    .string()
    .min(1, "City name is required")
    .min(3, "City name must be at least 3 characters"),
});

// Form Types
type AuthFormData = z.infer<typeof authSchema>;

export { authSchema, guessForm };
export type { AuthFormData };
