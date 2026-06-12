import { z } from 'zod';

export const ClientSchema = z.object({
  first_name: z
    .string({ error: 'Nome é obrigatório' })
    .min(2, 'Mínimo de 2 caracteres'),
  last_name: z.string().optional(),
  birth_date: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.length === 0 || z.email().safeParse(value).success,
      'E-mail inválido'
    ),
  save_to_contacts: z.boolean(),
});

export type ClientFormType = z.infer<typeof ClientSchema>;
