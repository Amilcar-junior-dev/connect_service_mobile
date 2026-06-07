import React, { memo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { cn } from '~/utils/cx';
import { useActiveTheme } from '~/hooks/colorScheme';
import { CustomSelectDropdownProps, CustomSelectOption, IconProps, PickerIconNames, typeSelectDropdown } from './customSelectDropdown.scheme';
import { useCustomPickerViewModel } from './customSelectDropdown.viewModel';

// SVGs
import User from '~/assets/svg/User.svg';
import Contact from '~/assets/svg/Contact.svg';
import ArrowDown from '~/assets/svg/ArrowDown.svg';
import Search from '~/assets/svg/Search.svg';
import Services from '~/assets/svg/Services.svg';
import Check from '~/assets/svg/Check.svg';
import Reminder from '~/assets/svg/Reminder.svg';
import RepeatEvent from '~/assets/svg/RepeatEvent.svg';

import { CardUser } from '~/components/cardUser/CardUser.view';
import { useModalStore } from '~/store/useModalStore';

interface LocalIconProps {
  width?: number;
  heigth?: number;
}

const CustomSelectDropdown = ({
  label,
  placeholder = 'Selecione uma opção',
  leftIcon = 'Contact',
  cardIcon ,
  rightActionIcon,
  onRightActionPress,
  options,
  onSelect,
  selectedValue,
  containerClass,
  labelClass,
  isRequire = false,
  error,
  typeDropdown = 'select',
  multiLabelSingular = 'item',
  multiLabelPlural = 'itens',
}: CustomSelectDropdownProps) => {


  const { colors } = useActiveTheme();
  const vm = useCustomPickerViewModel({ 
    options, 
    onSelect, 
    typeDropdown, 
    selectedValue,
    placeholder,
    multiLabelSingular,
    multiLabelPlural,
  });
  

  const IconOptions = {
    User:({width = 15, heigth = 15}: LocalIconProps)=>  <User color={colors?.ink} width={width} height={heigth}/>,
    Contact:({width = 15, heigth = 15}: LocalIconProps)=>  <Contact color={colors?.ink}  width={width} height={heigth}/>,
    ArrowDown:({width = 15, heigth = 15}: LocalIconProps)=>  <ArrowDown color={colors?.muted} width={width} height={heigth}/>,
    Services:({width = 15, heigth = 15}: LocalIconProps)=>  <Services color={colors?.ink} width={width} height={heigth}/>,
    Reminder:({width = 15, heigth = 15}: LocalIconProps)=>  <Reminder color={colors?.ink} width={width} height={heigth}/>,
    Repeat:({width = 15, heigth = 15}: LocalIconProps)=>  <RepeatEvent color={colors?.ink} width={width} height={heigth}/>,
    Search:({width = 15, heigth = 15}: LocalIconProps)=>  null,
    ChevronDown:({width = 15, heigth = 15}: LocalIconProps)=>  null,
    UserPlus:({width = 15, heigth = 15}: LocalIconProps)=>  null,
  };



  return (
    <View className={cn(`mb-4  w-full ${containerClass || ''}`)}>
      <Text className={cn(`text-sm font-normal text-ink mb-1 ${labelClass || ''}`)}>
        {label} {isRequire && <Text className={`text-ink`}>*</Text>}
      </Text>

      <View className={`flex-row items-center gap-2`}>
        <TouchableOpacity
          onPress={vm?.toggleOpen}
          activeOpacity={0.7}
          className={cn(
            `flex-1 h-12 flex-row items-center px-4 rounded-lg border bg-stone/20`,
            error ? `border-danger` : vm?.isOpen ? `border-tabBar/50` : `border-stone`
          )}
        >
          {leftIcon && !vm?.getSelectedImage() && (
            <View className={`mr-2 w-6 items-center`}>
              {IconOptions?.[leftIcon]?.({width: 25, heigth: 25})}
            </View>
          )}

          {vm?.getSelectedImage() && (
            <View className={`mr-2 w-6 items-center`}>
              <Image
                source={{ uri: vm?.getSelectedImage()! }}
                className={`w-6 h-6 rounded-full`}
                resizeMode="cover"
              />
            </View>
          )}
          
          <Text 
            className={cn(
              `flex-1 font-robotoRegular`,
              vm?.hasSelectedValue ? `text-ink` : `text-muted`
            )}
          >
            {vm?.getPlaceholderText()}
          </Text>

        
          <Animated.View style={vm?.arrowStyle}>
            <ArrowDown color={colors?.muted} />
          </Animated.View>
        </TouchableOpacity>

        {rightActionIcon && (
          <TouchableOpacity
            onPress={onRightActionPress}
            className={`bg-accent p-3 rounded-full shadow-sm active:opacity-80 items-center justify-center`}
          >
            { IconOptions?.[rightActionIcon]?.({width: 15, heigth: 15})}
          </TouchableOpacity>
        )}
      </View>

      <Animated.View 
        style={[vm?.dropdownStyle ]}
        className={`mt-2 w-full bg-surface rounded-xl border border-divider shadow-lg overflow-hidden`}
      >
        <View className={`flex-row items-center px-4 py-2 border-b border-divider`}>
          <View className={`flex-1 border-b border-ink`}>
            <TextInput
              placeholder="Pesquisar ..."
              className={` font-robotoRegular text-ink`}
              value={vm?.searchQuery}
              onChangeText={vm?.setSearchQuery}
              autoFocus
            />
          </View>
          <Search width={18} height={18} color={colors?.muted} />
        </View>

        <ScrollView className={`max-h-60 px-2 pb-2`}>
          {vm?.filteredOptions?.length === 0 ? (
            <Text className={`text-muted font-robotoMedium text-center mt-2 flex-1 `}>
              {`Item não encontrado, tente uma nova busca.`}
            </Text>
          ) : (
            vm?.filteredOptions?.map((item) => {
              const isSelected = typeDropdown === 'checkBox'
                ? (Array?.isArray(selectedValue) && selectedValue?.some((x: CustomSelectOption) => x?.id === item?.id))
                : (selectedValue && !Array?.isArray(selectedValue) && (selectedValue as CustomSelectOption)?.id === item?.id);

              return (
                <TouchableOpacity
                  key={item?.id}
                  onPress={() => vm?.handleSelect?.(item)}
                  activeOpacity={0.7}
                  className={cn(
                    `flex-row items-center justify-between p-3 rounded-lg border border-divider mb-1 bg-surface`,
                    isSelected ? `bg-accent/5 border-accent` : ``
                  )}
                >
                  <View className={`flex-row items-center flex-1`}>
                    {
                      cardIcon && (
                        <View className={`w-8 h-8 rounded-full items-center justify-center mr-3`}>
                          { IconOptions?.[cardIcon]({ width: 16, heigth: 16 })}
                        </View>
                      )
                    }
                    <Text className={`text-ink font-robotoMedium text-base flex-1`}>
                      {item?.label}
                    </Text>
                  </View>

                  {typeDropdown === 'checkBox' && (
                    <View 
                      className={cn(
                        `w-6 h-6 rounded border-2 items-center justify-center relative`,
                        isSelected ? `border-accent` : `border-stone`
                      )}
                    >
                      {isSelected && (
                        <Check color={colors?.accent} width={15} height={15}/>
                      )}
                    </View>
                  )}

                  {typeDropdown === 'radioButton' && (
                    <View 
                      className={cn(
                        `w-6 h-6 rounded-full border-2 items-center justify-center`,
                        isSelected ? `border-accent` : `border-stone`
                      )}
                    >
                      {isSelected && (
                        <View className={`w-3.5 h-3.5 rounded-full bg-accent`} />
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export const CustomSelectDropdownComponent = memo(CustomSelectDropdown);