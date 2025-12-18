import React from 'react';
import { Text, PressableProps, TouchableOpacity} from 'react-native';
import { ButtonComponentProps } from './button.scheme.ts';

const ButtonComponent: React.FC<PressableProps & ButtonComponentProps> = ({
    className,
    title,
    type,
    action
})=> {
    const ButtonType ={
        primary: `rounded-2xl bg-primaryBlue items-center justify-center p-3`,
        secondary: `border rounded-2xl border-primaryBlue items-center justify-center p-3`
    };
    return (
        <TouchableOpacity className={`w-full ${ButtonType[type]} ${className}`}
            activeOpacity={0.75}
            onPress={()=> action()}
        >
            <Text className={`font-medium text-3xl color-textPrimary`}> {title} </Text>
        </TouchableOpacity>
    )
}
export default ButtonComponent