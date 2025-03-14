import { z } from "zod";

export const signupSchema = z.object({
  firstname: z
    .string({ required_error: "Le prénom est obligatoire" })
    .min(1, { message: "Le prénom est obligatoire" }),
  lastname: z
    .string({ required_error: "Le nom de famille est obligatoire" })
    .min(1, { message: "Le nom de famille est obligatoire" }),
  email: z
    .string({ required_error: "L'email est obligatoire" })
    .email("Email invalide"),
  password: z
    .string({ required_error: "Le mot de passe est obligatoire" })
    .min(4, { message: "Le mot de passe doit contenir au moins 4 caractères" }),
  level: z
    .enum([
      "1",
      "2",
      "3",
      "3+",
      "4",
      "4+",
      "5",
      "5+",
      "6",
      "6+",
      "7",
      "7+",
      "8",
    ])
    .nullable(),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "L'email est obligatoire" })
    .email("Email invalide"),
  password: z
    .string({ required_error: "Le mot de passe est obligatoire" })
    .min(4, { message: "Le mot de passe doit contenir au moins 4 caractères" }),
});

export type SignupSchema = z.output<typeof signupSchema>;
export type LoginSchema = z.output<typeof loginSchema>;
