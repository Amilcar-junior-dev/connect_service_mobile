import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, Clipboard } from "react-native";
import { useColorScheme } from "nativewind";
import { Theme } from "~/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useServiceScreenViewModel, ServiceItem } from "./serviceScreen.viewModel";
import { useModalStore } from "~/store/useModalStore";
import { ResearchBar } from "~/components/researchBar/ResearchBar.view";
import { CardService } from "~/components/cardService/CardService.view";
import { CategoryContainer } from "~/components/categoryContainer/CategoryContainer.view";
import { useActiveTheme } from "~/hooks/colorScheme";
import Plus from "~/assets/svg/Plus.svg";
import PageAgendLink from "~/assets/svg/PageAgendLink.svg";

const FILTER_KEYS: (keyof ServiceItem)[] = ["service_name", "description_service"];

export default function ServiceScreen() {
  const { colorScheme } = useColorScheme();
  const openModal = useModalStore((state) => state?.openModal);
  const vm = useServiceScreenViewModel();
  const { colors, vars } = useActiveTheme();

  // Group services by category
  const groupedServices = useMemo(() => {
    const groups: Record<string, ServiceItem[]> = {};
    vm?.filteredServices?.forEach((service) => {
      const cat = service?.category || "Outros";
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat]?.push(service);
    });
    return groups;
  }, [vm?.filteredServices]);

  // Sorted list of category keys
  const categoriesList = useMemo(() => {
    return Object?.keys(groupedServices)?.sort();
  }, [groupedServices]);

  const handleSharePage = () => {
    Clipboard?.setString?.("https://connectservice.com.br/agendamento/empresa123");
    Alert?.alert("Sucesso", "Link da página de agendamento copiado para a área de transferência!");
  };

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

        {/* Share Button Row */}
        <View className={`w-full flex-row justify-end mb-4`}>
          <TouchableOpacity
            onPress={handleSharePage}
            className={`flex-row items-center px-4 py-2 bg-tabBar rounded-lg active:opacity-80`}
            activeOpacity={0.7}
          >
            <View className={`mr-2`}>
              <PageAgendLink color={colors?.muted} width={17} height={13} />
            </View>
            <Text className={`text-surface font-semibold text-sm`}>
              Compartilhar página agendamento
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider Line */}
        <View className={`w-full border-b border-stone/20 mb-4`} />

        {/* Categories List */}
        <FlatList
          data={categoriesList}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={
            <View className={`flex-1 items-center justify-center mt-10`}>
              <Text className={`text-muted text-base font-robotoMedium`}>
                Nenhum serviço encontrado.
              </Text>
            </View>
          }
          renderItem={({ item: categoryName }) => {
            const services = groupedServices[categoryName] || [];
            return (
              <CategoryContainer title={categoryName} count={services?.length}>
                <View className={`gap-4`}>
                  {services?.map((service) => (
                    <CardService
                      key={service?.id}
                      color={service?.color}
                      title={service?.service_name}
                      hours={service?.time_hours}
                      minutes={service?.time_minuts}
                      value={Number(service?.service_value)}
                      cardImage={service?.coverImage}
                    />
                  ))}
                </View>
              </CategoryContainer>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
}