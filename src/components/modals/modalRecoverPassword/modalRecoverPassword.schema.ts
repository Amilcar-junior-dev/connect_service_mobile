import { z } from 'zod';

export const RecoverPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email é obrigatório' })
    .pipe(z.email({ message: 'Email inválido' })),
});

export type RecoverPasswordFormData = z.infer<typeof RecoverPasswordSchema>;
