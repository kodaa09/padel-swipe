import { z } from "zod";

export const matchSchema = z.object({
  date: z.string().datetime(),
  price: z.number(),
  duration: z.number(),
  court: z.number(),
  level: z.array(z.string()),
  club: z.string(),
});

export type MatchSchema = z.infer<typeof matchSchema>;
