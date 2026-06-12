import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput } from 'react-native';
import { useActiveTheme } from '~/hooks/colorScheme';
import Search from '~/assets/svg/Search.svg';

export interface ResearchBarProps<T> {
  data: T[];
  onFilter: (filteredData: T[]) => void;
  placeholder?: string;
  filterKeys?: (keyof T)[];
}

export function ResearchBar<T>({
  data,
  onFilter,
  placeholder = 'Pesquisar',
  filterKeys,
}: ResearchBarProps<T>) {
  const { colors } = useActiveTheme();
  const [query, setQuery] = useState('');
  
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

  return (
    <View className={`flex-1 h-12 flex-row items-center px-4 rounded-xl bg-divider`}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors?.muted}
        value={query}
        onChangeText={setQuery}
        className={`flex-1 h-full text-ink font-robotoRegular text-base`}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View className={`ml-2`}>
        <Search color={colors?.muted} width={20} height={20} />
      </View>
    </View>
  );
}
