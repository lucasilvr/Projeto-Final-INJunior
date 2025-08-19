import { z } from "zod";

export const userSchema = z.object({
  userOrEmail: z
    .string()
    .nonempty("O Email ou Usuário não pode ser vazio")
    .refine(
      (value) => {
        if (value.includes('@')) {
          return z.string().email().safeParse(value).success;
        }
        return !/\s/.test(value);
      },
      {
        message: "Formato inválido. Digite um e-mail ou um nome de usuário.",
      }
    ),
  password: z
    .string()
    .nonempty("A senha não pode ser vazia")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type UserFormData = z.infer<typeof userSchema>;