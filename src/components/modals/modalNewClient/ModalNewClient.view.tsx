import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { FormProvider, Controller } from 'react-hook-form';

import { useModalNewClientViewModel } from './modalNewClient.viewModel';

import Close from '~/assets/svg/Close.svg';
import Contact from '~/assets/svg/Contact.svg';
import Edit from '~/assets/svg/Edit.svg';
import Trash from '~/assets/svg/Trash.svg';
import SearchImage from '~/assets/svg/SearchImage.svg';

import { useActiveTheme } from '~/hooks/colorScheme';
import { TextInputComponent } from '~/components/inputs/textInput/CustomTextInput.view';

interface ClientModalProps {
  data?: Record<string, unknown> | null;
}

type ClientFormProps = {
  methods: ReturnType<typeof useModalNewClientViewModel>['methods'];
};

const ClientForm = memo(function ClientForm({ methods }: ClientFormProps) {
  return (
    <FormProvider {...methods}>
      <TextInputComponent
        name="first_name"
        label="Nome"
        placeholder="Digite aqui"
        isRequire
        labelClass="text-lg"
        containerClass="mt-2"
      />

      <TextInputComponent
        name="last_name"
        label="Sobrenome"
        placeholder="Digite aqui"
        labelClass="text-lg"
      />

      <TextInputComponent
        name="birth_date"
        label="Nascimento"
        placeholder="00/00/0000"
        labelClass="text-lg"
        leftIcon="Calendar"
        maskType="date"
        keyboardType="numeric"
      />

      <TextInputComponent
        name="phone"
        label="Telefone"
        placeholder="(00) 00000-0000"
        labelClass="text-lg"
        leftIcon="Phone"
        maskType="phone"
        keyboardType="numeric"
      />

      <TextInputComponent
        name="email"
        label="Email"
        placeholder="Digite aqui"
        labelClass="text-lg"
        leftIcon="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      
    </FormProvider>
  );
});

export function ModalNewClient({ data }: ClientModalProps) {
  const { colors } = useActiveTheme();
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const vm = useModalNewClientViewModel();

  const MAX_MODAL_HEIGHT = SCREEN_HEIGHT * 0.92;

  return (
    <Modalize
      ref={vm.modalRef}
      modalHeight={MAX_MODAL_HEIGHT}
      openAnimationConfig={{
        timing: { duration: 200 },
      }}
      handlePosition="inside"
      keyboardAvoidingBehavior="padding"
      tapGestureEnabled={false}
      panGestureEnabled={false}
      closeOnOverlayTap={false}
      withHandle={false}
      modalStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#FFFFFF',
      }}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: 'handled',
        contentContainerStyle: {
          paddingBottom: 100,
          paddingTop: 20,
        },
      }}
      HeaderComponent={
        <View className="w-full px-5 py-12 pt-4 relative">
          <Text className="text-2xl self-center text-ink font-bold">
            Novo Cliente
          </Text>
          <View className="absolute top-4 right-5">
            <TouchableOpacity onPress={vm.handleClose}>
              <Close color={colors.ink} height={30} width={30} />
            </TouchableOpacity>
          </View>
        </View>
      }
      onClosed={vm.closeModal}
    >
      <View className="flex-1 pl-4 pr-4">
        <View className="items-center mb-6">
          <View className="relative w-32 h-32">
            <View
              className={`w-32 h-32 rounded-full overflow-hidden items-center justify-center border-2 ${
                vm.profileImage ? 'border-accent' : 'border-muted'
              }`}
              style={{ backgroundColor: vm.profileImage ? undefined : colors.tabBar }}
            >
              {vm.profileImage ? (
                <Image
                  source={{ uri: vm.profileImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <Contact height={48} width={48} color="#FFFFFF" />
              )}
            </View>

            {vm.profileImage && (
              <TouchableOpacity
                className="absolute top-0 right-0 w-9 h-9 rounded-full border border-danger bg-surface items-center justify-center"
                onPress={vm.handleRemoveImage}
              >
                <Trash color={colors.danger} height={16} width={16} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full border border-ink bg-surface items-center justify-center"
              onPress={vm.handleSelectOrEditImage}
            >
              {vm.profileImage ? (
                <Edit color={colors.ink} height={15} width={15} />
              ) : (
                <SearchImage color={colors.ink} height={15} width={15} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ClientForm methods={vm.methods} />

        <TouchableOpacity
          onPress={vm.onSubmit}
          className="bg-tabBar mt-6 h-12 items-center justify-center rounded-lg"
        >
          <Text className="font-bold text-surface">Salvar</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
}
