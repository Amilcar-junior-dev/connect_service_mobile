import { View, Text, TouchableOpacity, Image } from "react-native";

import Copy from '../../assets/svg/Copy.svg';
import { CardServiceProps } from "./carService.scheme";
import { formatCurrency } from "~/utils/masks";
import { useActiveTheme } from "~/hooks/colorScheme";
import { useFormContext, useWatch } from "react-hook-form";

import WithoutImage from '~/assets/svg/WithoutImage.svg';

export function CardService ({
    color = '#F00000',
    title,
    hours,
    minutes,
    value,
    cardImage 
}:CardServiceProps){
    const {colors} = useActiveTheme();
    
    return (
        <View className={`w-full rounded-lg  flex-row border`}
            style={{borderColor: color}}
        >
            <View className={`w-[8px] rounded-l-lg bg-red-600`}   style={{backgroundColor: color}} />
            <View className={ `w-full flex-row  py-2`}>
                <View className={ `h-full w-2/12 py-3 items-center  `}>
                    <View className={`w-12 h-12 rounded-xl overflow-hidden items-center  justify-center bg-muted/30`}>
                        {cardImage ? (
                            <Image 
                                source={{ uri: cardImage  }} 
                                className="w-full h-full" 
                                resizeMode="cover" 
                            />
                        ) : (
                            <WithoutImage height={15} width={15} />
                        )}
                    </View>
                </View>
                <View className={`w-10/12 justify-between `}>
                    <Text  className={ `text-tabBar text-xl text-bold ml-2  mb-2`} >
                        {title}
                    </Text>
                    <View className={` flex-row  `}>
                        <View className={ `w-5/12 `}>
                            <Text className={`ml-2 text-sm`}>{hours} Hr(s) {minutes} min(s) </Text>
                            <Text className={`ml-2 text-sm`}    numberOfLines={1}  >{formatCurrency(value)}</Text>
                        </View>
                        <View className={ `w-6/12 justify-end `}>
                            <TouchableOpacity className={`w-11/12 px-5 flex-row self-end h-6 rounded-full items-center justify-around`}  style={{backgroundColor: color}} >
                                <Copy color={colors.surface} height={15} width={15}/>
                                <Text className={`text-sm text-surface`}>Copiar Link</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}