import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string()
    .nonempty('O nome é obrigatório')
    .refine(value => /^[^\d]+$/.test(value), { 
      message: 'O nome não pode conter números'
    }),
  username: z.string()
    .nonempty('O nome de usuário é obrigatório')
    .refine(value => !/\s/.test(value), {
      message: 'O nome de usuário não pode conter espaços'
    })
    .refine(value => /^[a-zA-Z0-9_.-]+$/.test(value), {
      message: 'O nome de usuário não pode conter acentos ou caracteres especiais'
    }),
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .refine(value => !/\s/.test(value), {
      message: 'A senha não pode conter espaços'
    }),
  
  confirmPassword: z.string()
    .nonempty('A confirmação de senha é obrigatória')
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

export type createUser = z.infer<typeof createUserSchema>;