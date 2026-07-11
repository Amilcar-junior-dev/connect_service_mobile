export interface Service {
  id: string;
  service_name: string;
  description_service: string;
  time_hours: number;
  time_minuts: number;
  service_value: number; // Representação numérica limpa (decimal) para banco de dados/back-end
  color: string;
  category: {
    id: string | number;
    label: string;
  } | string;
  coverImage?: string;
  createdAt?: string;
}
