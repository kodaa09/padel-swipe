import { z } from "zod";

export const clubSchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().nullable(),
});

export type ClubSchema = z.infer<typeof clubSchema>;
