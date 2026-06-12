import { useState, useMemo } from 'react';

export interface ServiceItem {
  id: string;
  service_name: string;
  description_service: string;
  time_hours: number;
  time_minuts: number;
  service_value: string | number;
  color: string;
  coverImage?: string;
}

export function useServiceScreenViewModel() {
  const initialServices = useMemo<ServiceItem[]>(() => [
    {
      id: '1',
      service_name: 'Corte Masculino',
      description_service: 'Corte de cabelo masculino moderno',
      time_hours: 0,
      time_minuts: 45,
      service_value: '45.00',
      color: '#3B82F6',
    },
    {
      id: '2',
      service_name: 'Corte Feminino',
      description_service: 'Corte de cabelo feminino e escova',
      time_hours: 1,
      time_minuts: 30,
      service_value: '120.00',
      color: '#EC4899',
    },
    {
      id: '3',
      service_name: 'Coloração completa',
      description_service: 'Coloração profissional para cabelos',
      time_hours: 2,
      time_minuts: 0,
      service_value: '180.00',
      color: '#8B5CF6',
    },
    {
      id: '4',
      service_name: 'Barba Terapia',
      description_service: 'Barba com toalha quente e massagem',
      time_hours: 0,
      time_minuts: 30,
      service_value: '35.00',
      color: '#14B8A6',
    },
  ], []);

  const [filteredServices, setFilteredServices] = useState<ServiceItem[]>(initialServices);

  return {
    initialServices,
    filteredServices,
    setFilteredServices,
  };
}