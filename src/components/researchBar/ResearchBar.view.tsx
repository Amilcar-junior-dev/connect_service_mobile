import { View } from 'react-native';
import { FormProvider } from 'react-hook-form';
import { useResearchBarViewModel } from './researchBar.viewModel';
import { TextInputComponent } from '~/components/inputs/textInput/CustomTextInput.view';
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
  const { methods, colors } = useResearchBarViewModel({
    data,
    onFilter,
    filterKeys,
  });

  return (
    <FormProvider {...methods}>
      <View className={`flex-1 relative`}>
        <TextInputComponent
          name="search"
          label=""
          labelClass={`hidden`}
          containerClass={`mb-0`}
          className={`bg-divider border-0 rounded-xl pr-12`}
          placeholder={placeholder}
          placeholderTextColor={colors?.muted}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View className={`absolute right-4 top-0 bottom-0 justify-center`} pointerEvents="none">
          <Search color={colors?.muted} width={20} height={20} />
        </View>
      </View>
    </FormProvider>
  );
}
