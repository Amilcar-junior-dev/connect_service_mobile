import { memo, useState } from 'react';
import { View, Text,  } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '~/utils/cx';
import { TextInputComponentProps } from './customTextInput.scheme';
import MaskInput from 'react-native-mask-input';
import { currencyMaskDef } from '~/utils/masks';



function CustomTextInput({ 
  name, 
  className, 
  label, 
  containerClass, 
  labelClass, 
  isRequire = false,
  maskType,
  ...rest 
}: TextInputComponentProps) {
  
  
  const phoneMask = [
    '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
  ];
  
  const dateMask = [
    /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/
  ];

  const { control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

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

          <View className={cn(`mb-4 ${containerClass}`)}
          >
            <Text className={cn(`text-sm font-normal text-ink mb-1 ${labelClass || ''}`)}>
              {label + (isRequire ? ` *` : '') }
            </Text>
            
            <MaskInput
              className={cn(
                'h-12 w-full px-4 rounded-lg border bg-surface',
                error ? 'border-red-500' : isFocused ? 'border border-tabBar' : 'border-gray-300',
                className 
              )}
              onBlur={() => { onBlur(); setIsFocused(false); }}
              onFocus={() => setIsFocused(true)}
              
              onChangeText={(masked, unmasked) => {
                onChange(masked);
              }}
              
              value={value}
              mask={getMask()}
              keyboardType={maskType === 'currency' || maskType === 'phone' ? 'numeric' : rest.keyboardType}
              {...rest}
            />
            
            {error && <Text className={`text-xs text-red-500 mt-1`}>{error.message}</Text>}
            {rest.maxLength && <Text className={`text-xs  text-muted self-end  mt-2`}>{currentLength + `/${rest.maxLength}`}</Text>}
        
          </View>
        )
      }}
    />
  );
}

export const TextInputComponent = memo(CustomTextInput);