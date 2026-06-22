import { z } from 'zod';

export const loginScheme = z.object({
  email: z
    .string()
    .min(1, { message: 'Email é obrigatório' })
    .pipe(z.email({ message: 'Email inválido' })),
  password: z
    .string()
    .min(1, { message: 'Senha é obrigatória' })
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
});

export type LoginFormData = z.infer<typeof loginScheme>;
