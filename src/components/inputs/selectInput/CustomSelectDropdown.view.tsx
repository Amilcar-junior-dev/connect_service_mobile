import React, { memo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { cn } from '~/utils/cx';
import { useActiveTheme } from '~/hooks/colorScheme';
import { CustomSelectDropdownProps, PickerIconNames } from './customSelectDropdown.scheme';
import { useCustomPickerViewModel } from './customSelectDropdown.viewModel';

// SVGs
import User from '~/assets/svg/User.svg';
import Contact from '~/assets/svg/Contact.svg';
import ArrowDown from '~/assets/svg/ArrowDown.svg';
import Search from '~/assets/svg/Search.svg';
import { CardUser } from '~/components/cardUser/CardUser.view';
import { useModalStore } from '~/store/useModalStore';
// import ChevronDown from '~/assets/svg/ChevronDown.svg';
// import UserPlus from '~/assets/svg/UserPlus.svg';



const CustomSelectDropdown = ({
  label,
  placeholder = 'Selecione uma opção',
  leftIcon = 'Contact',
  rightActionIcon,
  onRightActionPress,
  options,
  onSelect,
  selectedValue,
  containerClass,
  labelClass,
  isRequire = false,
}: CustomSelectDropdownProps) => {


  const { colors } = useActiveTheme();
  const vm = useCustomPickerViewModel({ options, onSelect });
  
  const ITEM_HEIGHT = 56;

  const IconOptions = {
    User:  <User color={colors.ink} />,
    Contact:  <Contact color={colors.ink} />,
    ArrowDown:  <ArrowDown color={colors.muted} />,
    Search:  null,
    ChevronDown:  null,
    UserPlus:  null,
  };

  return (
    <View className={cn(`mb-4  w-full ${containerClass || ''}`)}>
      <Text className={cn(`text-sm font-normal text-ink mb-1 ${labelClass || ''}`)}>
        {label} {isRequire && <Text className={`text-ink`}>*</Text>}
      </Text>

      <View className={`flex-row items-center gap-2`}>
        <TouchableOpacity
          onPress={vm.toggleOpen}
          activeOpacity={0.7}
          className={cn(
            `flex-1 h-12 flex-row items-center px-4 rounded-lg border bg-surface`,
            vm.isOpen ? `border-tabBar` : `border-stone`
          )}
        >
          {leftIcon && !selectedValue?.img && (
            <View className={`mr-2 w-6 items-center`}>
              {IconOptions[leftIcon]}
            </View>
          )}

          {selectedValue?.img && (
            <View className={`mr-2 w-6 items-center`}>
              <Image
                source={{ uri: selectedValue?.img }}
                className={`w-6 h-6 rounded-full`}
                resizeMode="cover"
              />
            </View>
          )}
          
          <Text 
            className={cn(
              `flex-1 font-robotoRegular`,
              selectedValue ? `text-ink` : `text-muted`
            )}
          >
            {selectedValue?.label || placeholder}
          </Text>

        
          <Animated.View style={vm?.arrowStyle}>
            <ArrowDown color={colors.muted} />
          </Animated.View>
        </TouchableOpacity>

        {rightActionIcon && (
          <TouchableOpacity
            onPress={onRightActionPress}
            className={`bg-accent p-3 rounded-full shadow-sm active:opacity-80 items-center justify-center`}
          >
            { IconOptions[rightActionIcon]}
          </TouchableOpacity>
        )}
      </View>

      <Animated.View 
        style={vm.dropdownStyle}
        className={`mt-2 bg-surface rounded-xl border border-divider shadow-lg overflow-hidden origin-top`}
      >
        <View className={`flex-row items-center px-4 py-2 border-b border-divider`}>
          <View className={`flex-1 border-b border-ink`}>
            <TextInput
              placeholder="Pesquisar ..."
              className={` font-robotoRegular text-ink`}
              value={vm.searchQuery}
              onChangeText={vm?.setSearchQuery}
              autoFocus
            />
          </View>
          <Search width={18} height={18} color={colors.muted} />
        </View>

        <FlatList
          data={vm.filteredOptions}
          keyExtractor={(item) => item?.id?.toString()!}
          getItemLayout={(_, index) => (
            { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
          )}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={5}
          removeClippedSubviews={true}
          ListEmptyComponent={
            <Text className={`text-muted font-robotoMedium text-center mt-2 flex-1 `}>
              {`Item não encontrado, tente uma nova busca.`}
            </Text>
          }
          className={`max-h-60 px-2 pb-2`}
          renderItem={({ item }) => (
            <CardUser name={item?.label} onPress={()=>vm.handleSelect(item)} key={item?.id}/>
          )}
        />
      </Animated.View>
    </View>
  );
};

export const CustomSelectDropdownComponent = memo(CustomSelectDropdown);