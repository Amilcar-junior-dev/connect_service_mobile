import { useState, useMemo } from 'react';
import { useServiceStore } from '~/store/useServiceStore';

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
  const storeServices = useServiceStore((state) => state.services);

  const initialServices = useMemo<ServiceItem[]>(() => {
    return storeServices.map((service) => {
      const categoryName =
        typeof service.category === 'object' && service.category !== null
          ? service.category.label
          : String(service.category || 'Outros');

      return {
        id: service.id,
        service_name: service.service_name,
        description_service: service.description_service,
        time_hours: service.time_hours,
        time_minuts: service.time_minuts,
        service_value: service.service_value,
        color: service.color,
        category: categoryName,
        coverImage: service.coverImage,
      };
    });
  }, [storeServices]);

  const [filteredServices, setFilteredServices] = useState<ServiceItem[]>(initialServices);

  return {
    initialServices,
    filteredServices,
    setFilteredServices,
  };
}