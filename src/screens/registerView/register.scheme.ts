import { z } from 'zod';

export const registerScheme = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email é obrigatório' })
      .pipe(z.email({ message: 'Email inválido' })),
    password: z
      .string()
      .min(1, { message: 'Senha é obrigatória' })
      .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirmação de senha é obrigatória' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerScheme>;
