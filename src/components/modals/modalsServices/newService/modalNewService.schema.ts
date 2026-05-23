import { z } from 'zod';

export const ExpenseSchema = z.object({
  service_name: z.string({error: 'Nome é obrigatório'}).min(3, 'Mínimo de 3 caracteres'),
  description_service: z.string({error: 'Descrição é obrigatório'}).min(1, 'Descrição obrigatório'),
  time_hours: z.coerce
    .number({ error: "Digite um número válido" })
    .int("Não use pontos ou vírgulas, apenas horas inteiras.")
    .min(0, "Não pode ser negativo"),
  time_minuts: z.coerce
    .number({ error: "Digite um número válido" })
    .int("Não use pontos ou vírgulas.")
    .min(0, "Não pode ser negativo")
    .max(59, "Os minutos não podem passar de 59."),
  service_value: z.string({error: 'Valor do serviço é obrigatório'}).min(1, 'Valor do serviço é obrigatório')
});
  
export type DespesaFormType = z.infer<typeof ExpenseSchema>;
