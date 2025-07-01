import { z } from "zod";

export const Loginschema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const Registerschema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});