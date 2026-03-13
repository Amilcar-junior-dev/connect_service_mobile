import {View, StatusBar, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { useActiveTheme } from '~/hooks/colorScheme';
import { TopSheet } from '~/components/topSheet/topSheet.view';

export const HomeView: React.FC = ({
  

})=>{
    const theme = useActiveTheme()

    return (
        <LinearGradient
            colors={[theme.colors.primaryBlue, theme.colors.background]}
            style={{ flex:1 }}
        >
            <SafeAreaView className={`flex-1`} >
                <TopSheet>
                    {/* <View className="px-5 pb-8">
                    <Text className="text-xl font-bold">
                        Connect Service
                    </Text>
                    </View> */}
                </TopSheet>
               
            </SafeAreaView>
        </LinearGradient>
    )
}