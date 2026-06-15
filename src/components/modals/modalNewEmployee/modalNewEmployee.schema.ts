import { z } from 'zod';

export const EmployeeSchema = z.object({
  name: z
    .string({ error: 'Nome é obrigatório' })
    .min(2, 'Mínimo de 2 caracteres'),
  email: z.email('E-mail é obrigatório')
});

export type EmployeeFormType = z.infer<typeof EmployeeSchema>;
