import React, { memo, } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Modal } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { useModalNewServiceViewModel } from './modalNewService.viewModel';

import SearchImage from '~/assets/svg/SearchImage.svg';
import Edit from '~/assets/svg/Edit.svg';
import Trash from '~/assets/svg/Trash.svg';
import Close from '~/assets/svg/Close.svg'
import WithoutImage from '~/assets/svg/WithoutImage.svg';

import { useActiveTheme } from '~/hooks/colorScheme';
import { CardServicePreview } from '~/components/cardServicePreview/CardServicePreview';
import { FormProvider, Controller } from 'react-hook-form';
import { TextInputComponent } from '~/components/inputs/textInput/CustomTextInput.view';

import { SERVICE_COLORS } from '~/styles/colors';
import { CustomSelectDropdownComponent } from '~/components/inputs/selectInput/CustomSelectDropdown.view';
import { ColorPicker } from '~/components/inputs/colorPicker/ColorPicker.view';
import { BaseSelectOption } from '~/components/inputs/selectInput/customSelectDropdown.scheme';
import ButtonComponent from '~/components/buttons/Button';

interface ServiceModalProps {
  data?: Record<string, unknown> | null;
}

type ServiceFormProps = {
  methods: ReturnType<typeof useModalNewServiceViewModel>["methods"];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedImage: string;
  categories: BaseSelectOption[];
  onAddCategoryPress: () => void;
};

const ServiceForm = memo(function ServiceForm({
  methods,
  selectedColor,
  selectedImage,
  setSelectedColor,
  categories,
  onAddCategoryPress,
}: ServiceFormProps) {
  
  return (
    <FormProvider {...methods}>
        <TextInputComponent
            name="service_name"
            label="Nome do Serviço"
            placeholder="Digite aqui o nome do seu serviço"
            isRequire
            labelClass="text-lg"
            containerClass="mt-2"
        />

        <TextInputComponent
            name="description_service"
            label="Descrição do serviço"
            placeholder="Descreva o serviço"
            isRequire
            maxLength={200}
            multiline
            labelClass="text-lg"
            className={`h-20`}
        />

        <Controller
            control={methods?.control}
            name="category"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <CustomSelectDropdownComponent 
                    label="Categoria"
                    placeholder="Adicionar uma categoria"
                    leftIcon={null}
                    rightActionIcon="Category"
                    onRightActionPress={onAddCategoryPress}
                    options={categories}
                    onSelect={onChange}
                    selectedValue={value}
                    labelClass="text-left text-lg"
                    isRequire
                    typeDropdown="radioButton"
                    error={error?.message}
                />
            )}
        />

        <Text className={`self-center text-lg text-ink `}>Tempo estimado *</Text>
        <View className={`flex-row justify-between`}>
            <TextInputComponent
                name="time_hours"
                label="Horas"
                placeholder="00 Hr(s)"
                labelClass="text-lg self-center"
                containerClass={`w-[48%]`}
                keyboardType="numeric"
            />
            <TextInputComponent
                name="time_minuts"
                label="Minutos"
                placeholder="00 Min"
                labelClass="text-lg self-center"
                containerClass={`w-[48%]`}
                keyboardType="numeric"
            />
        </View>

        <TextInputComponent
            name="service_value"
            label="Valor"
            placeholder="R$ 00,00"
            isRequire
            labelClass="text-lg"
            maskType="currency"
        />

        <ColorPicker
          label="Cor do serviço"
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        <Text className={`text-ink text-lg mt-4 mb-4`}>Prévia</Text>
        <CardServicePreview color={selectedColor}  selectedImage={selectedImage} />
        
    </FormProvider>
  );
});

export function ModalNewService({ data }: ServiceModalProps) {

  const {colors} = useActiveTheme()
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const vm = useModalNewServiceViewModel(); 

  console.log(' MODAL NEW SERVICE RENDERIZADA')
  
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
        <View className={`w-full px-5 py-12  pt-4 relative  `}>
            <Text className={`text-2xl self-center text-ink font-bold `}>
                Novo Serviço
            </Text>
            <View className={`absolute top-4 right-5`}>
                <TouchableOpacity onPress={()=>{vm.handleClose() }} >
                        <Close color={colors.ink} height={30} width={30} />
                </TouchableOpacity>
            </View>
        </View>
      }
      onClosed={()=>{vm.closeModal(), console.log('PASSOU AQUI') }}
    >
      
      <View    className={`flex-1 pl-4 pr-4 `}>
          
            <View className={`w-full flex-row `}>
                <View className={ `w-5/12 flex-row`}>
                    <View className={`w-9/12 h-28 rounded-xl overflow-hidden items-center justify-center border-2   bg-muted/10  ${vm.coverImage ? `border-accent` : `border-muted`}`}>
                        {vm.coverImage ? (
                            <Image 
                                source={{ uri: vm.coverImage }} 
                                className={`w-full h-full`} 
                                resizeMode="cover" 
                            />
                        ) : (
                            <WithoutImage height={25} width={25} />
                        )}
                    </View>
                    <View className={`w-3/12 items-center ${vm.coverImage ? 'justify-between' : 'justify-start'}`}>
                        {
                            !vm.coverImage && (
                                <TouchableOpacity className={`w-9 h-9 rounded-full border border-ink items-center justify-center`}
                                    onPress={vm.handleSelectOrEditImage}
                                >
                                    <SearchImage color={colors.ink} height={15} width={15}/>
                                </TouchableOpacity>
                            )
                        }
                        {
                            vm.coverImage && (
                                <>
                                    <TouchableOpacity className={`w-9 h-9 rounded-full border border-ink items-center justify-center`}
                                        onPress={vm.handleSelectOrEditImage}
                                    >
                                        <Edit color={colors.ink} height={15} width={15}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity className={`w-9 h-9 rounded-full border border-danger items-center justify-center`}
                                        onPress={vm.handleRemoveImage}
                                    >
                                        <Trash color={colors.danger} height={18} width={18}/>
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    </View>

                </View>
                <View className={` w-7/12`}>
                    <Text className={`text-2xl text-ink`}> Imagem de capa </Text>
                    <Text  className={`text-sm text-muted`}> Obs: Tamanho suportado 5 MB.</Text>
                </View>

            </View>
            <ServiceForm
                methods={vm.methods}
                selectedColor={vm.selectedColor}
                selectedImage={vm.coverImage}
                setSelectedColor={vm.setSelectedColor}
                categories={vm.categories}
                onAddCategoryPress={vm.handleOpenCategoryModal}
            />

            <TouchableOpacity 
                onPress={()=>{ vm.onSubmit(), console.log('CLICOU NO SUBMITE')}} 
                className={`bg-tintBlue mt-8 h-12 items-center justify-center rounded-lg`}
            >
                <Text className={`font-bold text-ink`}>Salvar Serviço</Text>    
            </TouchableOpacity>
                
      </View>

      {/* Modal tipo Alert customizado para criação de categoria */}
      <Modal
        visible={vm.isCategoryModalVisible}
        transparent
        animationType="fade"
        onRequestClose={vm.handleCloseCategoryModal}
      >
        <View className={`flex-1 bg-black/50 justify-center items-center px-4`}>
          <View className={`bg-surface w-full max-w-sm rounded-2xl p-2 shadow-xl border border-divider`}>
            <Text className={`text-xl font-bold text-ink mb-4 text-center`}>Criar Nova Categoria</Text>
            
            <FormProvider {...vm.categoryMethods}>
              <TextInputComponent
                name="new_category_name"
                label="Nome da Categoria"
                placeholder="Digite o nome da categoria"
                isRequire
              />
            </FormProvider>

            <View className={`mt-4 gap-2`}>
              {/* <ButtonComponent
                type="secondary"
                title="Criar categoria"
                action={vm.handleCreateCategory}
              /> */}
              <TouchableOpacity className={`w-10/12 rounded-lg self-center p-2 bg-accent items-center justify-center`}
                onPress={vm.handleCreateCategory}
              >
                <Text className={`text-ink font-medium text-md`}>Criar categoria</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={vm.handleCloseCategoryModal}
                className={`p-3 items-center justify-center`}
              >
                <Text className={`text-muted font-medium text-lg`}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </Modalize>
  );
}