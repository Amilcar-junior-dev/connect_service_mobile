import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { FormProvider } from 'react-hook-form';

import { useModalNewEmployeeViewModel } from './modalNewEmployee.viewModel';
import Close from '~/assets/svg/Close.svg';
import { useActiveTheme } from '~/hooks/colorScheme';
import { TextInputComponent } from '~/components/inputs/textInput/CustomTextInput.view';
import { CircularImageInput } from '~/components/inputs/circularImageInput/CircularImageInput.view';
import { NewEmployeeModalProps, NewEmployeeFormProps } from './modalNewEmployee.scheme';

const EmployeeForm = memo(function EmployeeForm({ methods }: NewEmployeeFormProps) {
  return (
    <FormProvider {...methods}>
      <TextInputComponent
        name="name"
        label="Nome"
        placeholder="Digite aqui"
        isRequire
        labelClass={`text-lg`}
        containerClass={`mt-2`}
      />

      <TextInputComponent
        name="email"
        label="Email"
        placeholder="Digite aqui"
        isRequire
        labelClass={`text-lg`}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </FormProvider>
  );
});

export function ModalNewEmployee({ data }: NewEmployeeModalProps) {
  const { colors } = useActiveTheme();
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const vm = useModalNewEmployeeViewModel();

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
        <View className={`w-full px-5 py-12 pt-4 relative`}>
          <Text className={`text-2xl self-center text-ink font-bold font-robotoBold`}>
            Adicionar Funcionário
          </Text>
          <View className={`absolute top-4 right-5`}>
            <TouchableOpacity onPress={vm.handleClose}>
              <Close color={colors.ink} height={30} width={30} />
            </TouchableOpacity>
          </View>
        </View>
      }
      onClosed={vm.closeModal}
    >
      <View className={`flex-1 pl-4 pr-4`}>
        {/* Profile Image Circular Selector */}
        <CircularImageInput
          imageUri={vm.profileImage}
          onChangeImage={vm.setProfileImage}
          onRemoveImage={vm.handleRemoveImage}
          containerClass={`justify-center mb-6`}
          sizeClass={`w-32 h-32`}
          iconSize={48}
        />

        <EmployeeForm methods={vm.methods} />

        <TouchableOpacity
          onPress={vm.onSubmit}
          activeOpacity={0.7}
          className={`bg-tabBar mt-6 h-12 items-center justify-center rounded-lg active:opacity-90`}
        >
          <Text className={`font-bold text-surface font-robotoBold text-base`}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
}
