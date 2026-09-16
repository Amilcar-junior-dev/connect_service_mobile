import { z } from 'zod';

export const onboardingScheme = z.object({
  // Passo 1: Nome & Foto
  firstName: z
    .string()
    .min(2, 'Informe seu nome com pelo menos 2 caracteres'),
  lastName: z.string().optional(),
  avatarUrl: z.string().optional(),

  // Passo 2: Especialização
  specialization: z
    .string()
    .min(2, 'Selecione ou digite sua especialização'),

  // Passo 3: Local de Trabalho & Endereço
  workplaceName: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),

  // Passo 4: Horários de Atendimento (JSON)
  operatingHours: z.record(z.string(), z.any()).optional(),
});

export type OnboardingFormData = z.infer<typeof onboardingScheme>;
