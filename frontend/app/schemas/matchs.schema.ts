import { z } from "zod";

export const matchSchema = z.object({
  date: z.string().datetime(),
  price: z.number(),
  duration: z.number(),
  courtNumber: z.number(),
  level: z.array(z.string()),
  clubId: z.string(),
  playersCount: z.number(),
});

export type MatchSchema = z.infer<typeof matchSchema>;
