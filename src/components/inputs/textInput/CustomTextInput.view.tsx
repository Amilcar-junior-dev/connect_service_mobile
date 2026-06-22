import { memo, useState, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFormContext, Controller, FieldError } from 'react-hook-form';
import { cn } from '~/utils/cx';
import { TextInputComponentProps, leftIconType } from './customTextInput.scheme';
import MaskInput from 'react-native-mask-input';
import { currencyMaskDef } from '~/utils/masks';

import Calendar from '~/assets/svg/Calendar.svg';
import Phone from '~/assets/svg/Phone.svg';
import Email from '~/assets/svg/Email.svg';
import Eye from '~/assets/svg/Eye.svg';
import CloseEye from '~/assets/svg/CloseEye.svg';
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
  rightIcon,
  error: errorProps,
  secureTextEntry,
  ...rest 
}: TextInputComponentProps) {
  const formContext = useFormContext();
  const control = formContext?.control;
  const { colors } = useActiveTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const phoneMask = [
    '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
  ];
  
  const dateMask = [
    /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/
  ];

  const IconOptions = {
    Calendar: (error: FieldError | string | undefined) => (
      <Calendar color={error ? colors?.danger : colors?.ink} />
    ),
    Phone: (error: FieldError | string | undefined) => (
      <Phone color={error ? colors?.danger : colors?.ink} />
    ),
    Email: (error: FieldError | string | undefined) => (
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

  const isPasswordType = secureTextEntry;

  const renderInput = (
    inputValue: any,
    inputOnChange: (text: string) => void,
    inputOnBlur: any,
    inputError: string | undefined
  ) => {
    const currentLength = typeof inputValue === 'string' ? inputValue.length : 0;
    const leftIconExists = !!leftIcon;
    const rightIconExists = !!rightIcon || isPasswordType;

    return (
      <View className={cn(`mb-4 ${containerClass || ''}`)}>
        {label && (
          <Text className={cn(`text-sm font-normal text-ink mb-1 ${labelClass || ''}`)}>
            {label + (isRequire ? ` *` : '')}
          </Text>
        )}

        <View
          className={cn(
            `flex-row w-full px-4 rounded-lg border bg-stone/20`,
            rest.multiline ? `h-24 py-2` : `h-12 items-center`,
            inputError ? `border-danger` : isFocused ? `border border-tabBar` : `border-gray-300`
          )}
        >
          {leftIconExists && (
            <View className={cn(`w-1/12 justify-center items-center`, rest.multiline ? `pt-1` : ``)}>
              {typeof leftIcon === 'string' && leftIcon in IconOptions
                ? IconOptions[leftIcon as leftIconType](inputError)
                : (leftIcon as ReactNode)
              }
            </View>
          )}

          <MaskInput
            className={cn(
              `flex-grow text-base text-ink`, 
              leftIconExists ? `ml-2` : `ml-0`,
              rightIconExists ? `mr-2` : `mr-0`,
              rest.multiline ? `h-full` : ``,
              className
            )}
            onBlur={() => { 
              inputOnBlur(); 
              setIsFocused(false); 
            }}
            onFocus={(e) => {
              setIsFocused(true);
              rest.onFocus?.(e);
            }}
            onChangeText={(masked) => {
              inputOnChange(masked);
            }}
            value={inputValue}
            mask={getMask()}
            keyboardType={maskType === 'currency' || maskType === 'phone' ? 'numeric' : rest.keyboardType}
            textAlignVertical={rest.multiline ? 'top' : 'center'}
            secureTextEntry={isPasswordType && !passwordVisible}
            {...rest}
          />

          {isPasswordType ? (
            <TouchableOpacity 
              onPress={() => setPasswordVisible(prev => !prev)}
              className="w-1/12 justify-center items-center h-full animate-fade"
              activeOpacity={0.7}
            >
              {passwordVisible ? (
                <Eye color={inputError ? colors?.danger : colors?.ink} width={20} height={20} />
              ) : (
                <CloseEye color={inputError ? colors?.danger : colors?.ink} width={20} height={20} />
              )}
            </TouchableOpacity>
          ) : rightIcon ? (
            <View className={cn(`w-1/12 justify-center items-center`)}>
              {rightIcon}
            </View>
          ) : null}
        </View>

        {inputError && <Text className={`text-xs text-danger mt-1`}>{inputError}</Text>}
        {rest.maxLength && <Text className={`text-xs text-muted self-end mt-2`}>{currentLength}/{rest.maxLength}</Text>}
      </View>
    );
  };

  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
          return renderInput(value || '', onChange, onBlur, error?.message || errorProps);
        }}
      />
    );
  }

  return renderInput(
    rest.value || '',
    rest.onChangeText || (() => {}),
    rest.onBlur || (() => {}),
    errorProps
  );
}

export const TextInputComponent = memo(CustomTextInput);