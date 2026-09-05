import { z } from 'zod';

export const onboardingScheme = z.object({
  // Passo 1: Identificação do Negócio
  companyName: z
    .string()
    .min(3, 'O nome da empresa deve ter pelo menos 3 caracteres'),
  slug: z
    .string()
    .min(3, 'Slug inválido'),

  // Passo 2: Segmento & Porte
  segment: z
    .string()
    .min(1, 'Selecione um segmento para continuar'),
  teamSize: z
    .string()
    .min(1, 'Selecione o porte da equipe para continuar'),

  // Passo 3: Atendimento & Endereço
  serviceType: z
    .string()
    .min(1, 'Selecione o tipo de atendimento'),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
});

export type OnboardingFormData = z.infer<typeof onboardingScheme>;
