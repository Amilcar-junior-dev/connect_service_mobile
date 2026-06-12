import { useState, useMemo } from 'react';

export interface ServiceItem {
  id: string;
  service_name: string;
  description_service: string;
  time_hours: number;
  time_minuts: number;
  service_value: string | number;
  color: string;
  category: string;
  coverImage?: string;
}

export function useServiceScreenViewModel() {
  const initialServices = useMemo<ServiceItem[]>(() => [
    // Software
    {
      id: '1',
      service_name: 'Desenvolvimento de sistemas',
      description_service: 'Desenvolvimento de sistemas sob demanda',
      time_hours: 1,
      time_minuts: 20,
      service_value: '250.00',
      color: '#F59E0B',
      category: 'Software',
    },
    {
      id: '2',
      service_name: 'Desenvolvimento de sistemas',
      description_service: 'Desenvolvimento de sistemas sob demanda',
      time_hours: 1,
      time_minuts: 20,
      service_value: '250.00',
      color: '#3B82F6',
      category: 'Software',
    },
    {
      id: '3',
      service_name: 'Desenvolvimento de sistemas',
      description_service: 'Desenvolvimento de sistemas sob demanda',
      time_hours: 1,
      time_minuts: 20,
      service_value: '250.00',
      color: '#10B981',
      category: 'Software',
    },
    // Robótica
    {
      id: '4',
      service_name: 'Programação de CLP',
      description_service: 'Automação industrial e CLP',
      time_hours: 3,
      time_minuts: 0,
      service_value: '450.00',
      color: '#6366F1',
      category: 'Robótica',
    },
    // Estética
    {
      id: '5',
      service_name: 'Limpeza de Pele',
      description_service: 'Limpeza profunda e hidratação',
      time_hours: 1,
      time_minuts: 0,
      service_value: '80.00',
      color: '#EC4899',
      category: 'Estética',
    },
    {
      id: '6',
      service_name: 'Massagem Modeladora',
      description_service: 'Redução de medidas',
      time_hours: 0,
      time_minuts: 50,
      service_value: '90.00',
      color: '#14B8A6',
      category: 'Estética',
    },
    {
      id: '7',
      service_name: 'Drenagem Linfática',
      description_service: 'Melhora da circulação',
      time_hours: 1,
      time_minuts: 0,
      service_value: '100.00',
      color: '#10B981',
      category: 'Estética',
    },
    {
      id: '8',
      service_name: 'Peeling Químico',
      description_service: 'Renovação celular',
      time_hours: 0,
      time_minuts: 45,
      service_value: '150.00',
      color: '#8B5CF6',
      category: 'Estética',
    },
    {
      id: '9',
      service_name: 'Design de Sobrancelhas',
      description_service: 'Modelagem de sobrancelhas',
      time_hours: 0,
      time_minuts: 30,
      service_value: '40.00',
      color: '#EF4444',
      category: 'Estética',
    },
    {
      id: '10',
      service_name: 'Microagulhamento',
      description_service: 'Tratamento de cicatrizes e colágeno',
      time_hours: 1,
      time_minuts: 15,
      service_value: '220.00',
      color: '#F59E0B',
      category: 'Estética',
    },
    {
      id: '11',
      service_name: 'Depilação a Laser',
      description_service: 'Sessão de depilação duradoura',
      time_hours: 0,
      time_minuts: 30,
      service_value: '120.00',
      color: '#2563EB',
      category: 'Estética',
    },
    {
      id: '12',
      service_name: 'Manicure e Pedicure',
      description_service: 'Cuidado das unhas',
      time_hours: 1,
      time_minuts: 0,
      service_value: '60.00',
      color: '#EC4899',
      category: 'Estética',
    },
  ], []);

  const [filteredServices, setFilteredServices] = useState<ServiceItem[]>(initialServices);

  return {
    initialServices,
    filteredServices,
    setFilteredServices,
  };
}