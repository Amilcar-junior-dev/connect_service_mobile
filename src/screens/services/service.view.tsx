import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useServiceScreenViewModel } from "./serviceScreen.viewModel";
import { useModalStore } from "~/store/useModalStore";
import { ResearchBar } from "~/components/researchBar/ResearchBar.view";
import { CardService } from "~/components/cardService/CardService.view";
import { useActiveTheme } from "~/hooks/colorScheme";
import Plus from "~/assets/svg/Plus.svg";
import { ServiceItem } from "./serviceScreen.viewModel";

const FILTER_KEYS: (keyof ServiceItem)[] = ["service_name", "description_service"];

export default function ServiceScreen() {
  const { colorScheme } = useColorScheme();
  const openModal = useModalStore((state) => state?.openModal);
  const vm = useServiceScreenViewModel();
  const { colors, vars } = useActiveTheme();

  return (
    <View style={[vars]} className={`flex-1 bg-surface pl-4 pr-4`}>
      <SafeAreaView className={`flex-1`} edges={["top"]}>
        {/* Header */}
        <View className={`w-full flex-row items-center justify-center py-4`}>
          <Text className={`text-xl font-bold text-ink`}>Meus Serviços</Text>
        </View>

        {/* Search & Add Bar Row */}
        <View className={`w-full flex-row items-center mb-4`}>
          <ResearchBar
            data={vm?.initialServices}
            onFilter={vm?.setFilteredServices}
            placeholder="Pesquisar serviço"
            filterKeys={FILTER_KEYS}
          />
          <TouchableOpacity
            onPress={() => openModal?.("SERVICE")}
            className={`w-12 h-12 rounded-full bg-tabBar items-center justify-center ml-3 active:opacity-80`}
            activeOpacity={0.7}
          >
            <Plus color={colors?.muted} width={20} height={20} />
          </TouchableOpacity>
        </View>

        {/* Services List */}
        <FlatList
          data={vm?.filteredServices}
          keyExtractor={(item) => item?.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ItemSeparatorComponent={() => <View className={`h-4`} />}
          ListEmptyComponent={
            <View className={`flex-1 items-center justify-center mt-10`}>
              <Text className={`text-muted text-base font-robotoMedium`}>
                Nenhum serviço encontrado.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <CardService
              color={item?.color}
              title={item?.service_name}
              hours={item?.time_hours}
              minutes={item?.time_minuts}
              value={Number(item?.service_value)}
              cardImage={item?.coverImage}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}