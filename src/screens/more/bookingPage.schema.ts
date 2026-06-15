import { z } from 'zod';

export const BookingPageSchema = z.object({
  companyName: z
    .string({ error: 'Nome da empresa é obrigatório' })
    .min(2, 'Nome da empresa deve conter pelo menos 2 caracteres'),
  pageUrl: z
    .string({ error: 'URL da página é obrigatória' })
    .min(2, 'URL deve conter pelo menos 2 caracteres'),
  aboutCompany: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.length === 0 || z.string().email().safeParse(value).success,
      'E-mail inválido'
    ),
  countryCode: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
});

export type BookingPageFormType = z.infer<typeof BookingPageSchema>;
