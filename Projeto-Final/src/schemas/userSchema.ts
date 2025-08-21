import { z } from "zod";

export const userSchema = z.object({
  identifier: z
    .string()
    .nonempty("O Email ou Usuário não pode ser vazio")
    .refine(
      (value) => {
        if (value.includes('@')) {
          return z.string().email("Formato de e-mail inválido").safeParse(value).success;
        }
        return /^[a-zA-Z0-9_.-]+$/.test(value); 
      },
      {
        message: "Formato invalido, use um e-mail ou um usuário sem espaços e acentos",
      }
    ),
  password: z
    .string()
    .nonempty("A senha não pode ser vazia")
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .regex(/^\S+$/, "A senha não pode conter espaços"), 
});

export type UserFormData = z.infer<typeof userSchema>;