import { z } from "zod";
const authSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional(),
  invited: z.boolean().optional().default(false),
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

const countryFormSchema = z.object({
  country: z
    .string()
    .min(3, { message: "Country name must be at least 3 characters long" })
    .max(50, { message: "Country name is too long" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces are allowed" }),
});

const inviteFormSchema = z.object({
  username: z.string().min(1, "Please enter a username to invite."),
});

// Form Types
type AuthFormData = z.infer<typeof authSchema>;
type CountryFormData = z.infer<typeof countryFormSchema>;
type GuessFormData = z.infer<typeof guessForm>;
type inviteFormData = z.infer<typeof inviteFormSchema>;

export { authSchema, guessForm, countryFormSchema, inviteFormSchema };
export type { AuthFormData, CountryFormData, GuessFormData, inviteFormData };
