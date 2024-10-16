import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8, "Harus terdiri dari setidaknya 8 karakter."),
  rememberMe: z.boolean(),
});

export const initialState = {
  username: undefined,
  password: undefined,
  rememberMe: false,
};

export type Schema = z.output<typeof loginSchema>;
