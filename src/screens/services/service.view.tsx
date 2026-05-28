import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity, ImageProps, ImageSourcePropType } from "react-native";
import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormProvider } from "react-hook-form";
import { TextInputComponent } from "~/components/inputs/textInput/CustomTextInput.view";
import { useServiceScreenViewModel } from "./serviceScreen.viewModel";
import { CardServicePreview } from "../../components/cardServicePreview/CardServicePreview";





const SERVICE_COLORS = [
    "#3B82F6", "#2563EB", "#0EA5E9", "#22C55E",
    "#16A34A", "#14B8A6", "#969E9E", "#6366F1",
    "#8B5CF6", "#F59E0B", "#EF4444", "#EC4899",
];


export default function ServiceScreen(){

    const {colorScheme} = useColorScheme();
    const vm = useServiceScreenViewModel();
    const activeTheme = colorScheme === "dark" ? Theme.dark : Theme.light;

    return (
       
        <View  style={[activeTheme.vars]}  className={`flex-1 bg-surface pl-4 pr-4 `}>
            <SafeAreaView className={`flex-1`}>
                
        
                    
            </SafeAreaView>
        </View>


    )
}