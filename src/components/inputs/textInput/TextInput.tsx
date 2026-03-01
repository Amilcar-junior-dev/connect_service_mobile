import { useState } from "react";

import {TextInput, View, Text, TextInputProps, TouchableOpacity} from 'react-native';

import { useColorScheme } from "nativewind";

import { InputProps } from "../inputText.scheme";

import { Theme } from "~/styles/colors";
import { ThemeColor, useThemeColor } from "~/hooks/useColors";

import Email from '~/assets/svg/Email.svg';
import Password from '~/assets/svg/Password.svg';
import EyeShow from '~/assets/svg/EyeShow.svg';
import Phone from '~/assets/svg/Phone.svg';
import { cx } from "~/utils/cx";
import { MapIcons } from "~/shared/mapIcons";







type InputStateFlags = {
    error?: boolean ;
    focused?: boolean;
};
enum stateMapOptions {
    ERROR = 'error',
    FOCUSED = 'focused',
    DEFAULT = 'default'
}

const TextInputComponent: React.FC<TextInputProps & InputProps> =  ({
    type = 'primary',
    label,
    placeholder,
    value,
    className,
    leftIcon = 'password',
    rightIcon,
    heightIcon = 22,
    widthIcon = 22 ,
    error,
    onChangeText,
    rightIconAction,
    ...props
})=> {
    const {colorScheme} = useColorScheme();

    const [focused, setFocused] = useState(false);
    
    const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;
 
    const leftIconOptions = {  
        email:(color:ThemeColor)=>  <Email color={useThemeColor(color)}  height={heightIcon} width={widthIcon}/>,
        password:(color:ThemeColor)=> <Password color={useThemeColor(color)} height={heightIcon} width={widthIcon} />,
        phone:(color:ThemeColor)=> <Phone color={useThemeColor(color)} height={heightIcon} width={widthIcon} />
    };

    const rightIconOptions = {
        eyeShow:(color:ThemeColor)=>  <EyeShow  color={useThemeColor(color)} height={heightIcon} width={widthIcon}/>,
    };

    //Style Mappings
    const inputVariants = {
        base: `w-full pb-3 pt-3`,
        type: {
            primary: `border-b border-border`,
            secondary: `border rounded-lg border-border p-3`,
        },
        state: {
            default: ``,
            focused: `border-primaryBlue`,
            error: `border-warningRed`,
        },
        iconState: {
            default: `textPrimary`,
            focused: `primaryBlue`,
            error: `warningRed`,
        },
        labelState:{
            default: `text-textPrimary`,
            focused: `text-primaryBlue`,
            error: `text-warningRed`,
        },
    } ;

    // Os estados devem ser colocados na ordem de precedência pois irá retornar o primeiro que estiver como true
    const stateMap: {
        key: keyof typeof inputVariants.state;
        when: (state: InputStateFlags) => boolean;
    }[] = [
        { key: stateMapOptions.ERROR, when: (state) => Boolean(state.error) },
        { key: stateMapOptions.FOCUSED, when: (state) => Boolean(state.focused) },
        { key: stateMapOptions.DEFAULT, when: () => true }
    ];
    //Precisamos colocar error: Boolean(error) pois error pode ser undefined e com Boolean o convertemos para false que é do tipo booleano
    const currentState =   stateMap.find(s => s.when({ error: Boolean(error), focused }))!.key;

    const containerClass = cx(
        inputVariants.base,
        inputVariants.type[type],
        inputVariants.state[currentState],
        className
    );
    

    const iconClass = cx(
        inputVariants.iconState[currentState]
    ) as ThemeColor

    const labelClass = cx(
        inputVariants.labelState[currentState]
    ) as ThemeColor
  

    return (
        <View style={[activeTheme.vars]}   className={`${containerClass}`} >
            <Text className={`text-textPrimary ${labelClass} `}>{label}</Text>
            <View className={`w-full flex-row mt-3`}>
                {MapIcons[leftIcon](useThemeColor(iconClass) as ThemeColor )}
                <TextInput
                    {...props}
                    className={`pl-2 w-10/12 text-textPrimary`}
                    value={value}
                    onChangeText={(text)=>{onChangeText?.(text)}}
                    placeholder={placeholder}       
                    onFocus={() => { setFocused(true) }}
                    onBlur={() =>  { setFocused(false) } }       
                />
              
                {rightIcon && 
                    <TouchableOpacity onPress={()=> rightIconAction?.()} >
                        {MapIcons[rightIcon](useThemeColor(iconClass) as ThemeColor)}
                    </TouchableOpacity>
                }
            </View>
            <View className={`w-full mt-3 ${error ? `flex` : `hidden`}`}>
                <Text className={`text-warningRed`}>{error}</Text>
            </View>
        </View>
    )
}

export default TextInputComponent;