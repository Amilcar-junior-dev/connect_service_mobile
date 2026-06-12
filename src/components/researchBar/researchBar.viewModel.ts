import { useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useActiveTheme } from '~/hooks/colorScheme';

interface UseResearchBarViewModelProps<T> {
  data: T[];
  onFilter: (filteredData: T[]) => void;
  filterKeys?: (keyof T)[];
}

export function useResearchBarViewModel<T>({
  data,
  onFilter,
  filterKeys,
}: UseResearchBarViewModelProps<T>) {
  const { colors } = useActiveTheme();

  const methods = useForm({
    defaultValues: {
      search: '',
    },
  });

  const query = useWatch({ control: methods?.control, name: 'search' }) || '';

  // Use a ref for onFilter to prevent infinite loop re-runs of the effect if parent doesn't memoize onFilter
  const onFilterRef = useRef(onFilter);
  useEffect(() => {
    onFilterRef.current = onFilter;
  }, [onFilter]);

  const filterKeysSerialized = JSON?.stringify(filterKeys);

  useEffect(() => {
    if (!query?.trim()) {
      onFilterRef?.current?.(data);
      return;
    }

    const lowerQuery = query?.toLowerCase();
    const filtered = data?.filter((item) => {
      if (filterKeys && filterKeys?.length > 0) {
        return filterKeys?.some((key) => {
          const val = item[key];
          return typeof val === 'string' && val?.toLowerCase()?.includes(lowerQuery);
        });
      }

      // Check all values in the object that are strings or numbers
      return Object?.values(item as Record<string, unknown>)?.some((val) => {
        if (typeof val === 'string') {
          return val?.toLowerCase()?.includes(lowerQuery);
        }
        if (typeof val === 'number') {
          return String(val)?.toLowerCase()?.includes(lowerQuery);
        }
        return false;
      });
    });

    onFilterRef?.current?.(filtered);
  }, [query, data, filterKeysSerialized]);

  return {
    methods,
    colors,
  };
}
