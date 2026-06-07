import { memo, useState } from 'react';
import { View, Text,  } from 'react-native';
import { useFormContext, Controller, FieldError } from 'react-hook-form';
import { cn } from '~/utils/cx';
import { TextInputComponentProps } from './customTextInput.scheme';
import MaskInput from 'react-native-mask-input';
import { currencyMaskDef } from '~/utils/masks';

import Calendar from '~/assets/svg/Calendar.svg';
import Phone from '~/assets/svg/Phone.svg';
import Email from '~/assets/svg/Email.svg';
import { useActiveTheme } from '~/hooks/colorScheme';



function CustomTextInput({ 
  name, 
  className, 
  label, 
  containerClass, 
  labelClass, 
  isRequire = false,
  maskType,
  leftIcon,
  ...rest 
}: TextInputComponentProps) {
  const { control } = useFormContext();
  const {colors} = useActiveTheme()

  const [isFocused, setIsFocused] = useState(false);
  
  const phoneMask = [
    '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
  ];
  
  const dateMask = [
    /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/
  ];

  const IconOptions = {
    Calendar: (error: FieldError | undefined) => (
      <Calendar color={error ? colors?.danger : colors?.ink} />
    ),
    Phone: (error: FieldError | undefined) => (
      <Phone color={error ? colors?.danger : colors?.ink} />
    ),
    Email: (error: FieldError | undefined) => (
      <Email color={error ? colors?.danger : colors?.ink} />
    ),
  };

  const getMask = () => {
    switch (maskType) {
      case 'currency': return currencyMaskDef;
      case 'phone': return phoneMask;
      case 'date': return dateMask;
      default: return undefined;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value,  }, fieldState: { error,  } }) => {
        const currentLength = value?.length || 0;
        return (

          <View className={cn(`mb-4 ${containerClass} `)}
          >
            <Text className={cn(`text-sm font-normal text-ink mb-1 ${labelClass || ''}`)}>
              {label + (isRequire ? ` *` : '') }
            </Text>

            <View
              className={cn(
                'flex-row w-full px-4 rounded-lg border bg-surface',
                rest.multiline ? 'h-24 py-2' : 'h-12 items-center',
                error ? 'border-danger' : isFocused ? 'border border-tabBar' : 'border-gray-300',
                className 
              )}
            >
              { leftIcon && (
                  <View className={cn(`w-1/12 justify-center items-center`, rest.multiline ? `pt-1` : ``)}>
                    { IconOptions[leftIcon](error)}
                  </View>
                )
              }
              <MaskInput
                className={cn(`w-11/12 ml-2`, rest.multiline ? `h-full` : ``)}
                onBlur={() => { onBlur(); setIsFocused(false); }}
                onFocus={() => setIsFocused(true)}
                
                onChangeText={(masked, unmasked) => {
                  onChange(masked);
                }}
                
                value={value}
                mask={getMask()}
                keyboardType={maskType === 'currency' || maskType === 'phone' ? 'numeric' : rest.keyboardType}
                textAlignVertical={rest.multiline ? 'top' : 'center'}
                {...rest}
              />

            </View>
            
            
            {error && <Text className={`text-xs text-danger mt-1`}>{error.message}</Text>}
            {rest.maxLength && <Text className={`text-xs  text-muted self-end  mt-2`}>{currentLength + `/${rest.maxLength}`}</Text>}
        
          </View>
        )
      }}
    />
  );
}

export const TextInputComponent = memo(CustomTextInput);