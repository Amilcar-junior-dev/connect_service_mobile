import { useEffect, useRef, useState } from 'react';
import { useAppForm } from '~/hooks/useAppForm';
import { ExpenseSchema } from './modalNewService.schema';
import { useImagePicker } from '~/hooks/useImagePicker';
import { useModalStore } from '~/store/useModalStore';
import { Modalize } from 'react-native-modalize';
import { z } from 'zod';
import { BaseSelectOption } from '~/components/inputs/selectInput/customSelectDropdown.scheme';

export function useModalNewServiceViewModel() {
  const modalRef = useRef<Modalize>(null);
  const methods = useAppForm({ schema: ExpenseSchema });

  const closeModal = useModalStore((state) => state.closeModal);
  const modalVisible = useModalStore((state) => state.activeModal)

  const [selectedColor, setSelectedColor] = useState<string>('#969E9E');
  const [coverImage, setCoverImage] = useState<string>('');

  // Estados para gerenciamento dinâmico de categorias
  const [categories, setCategories] = useState<BaseSelectOption[]>([]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

  // Formulário do modal de criar categoria
  const categoryMethods = useAppForm({
    schema: z.object({
      new_category_name: z.string().min(1, 'Nome é obrigatório'),
    }),
  });

  const { pickImage } = useImagePicker();

  useEffect(() => {
    modalRef.current?.open();
  }, []);

  const handleClose = () => {
    modalRef.current?.close();
  };

  const onSubmit = methods.handleSubmit(
    (data) => {
      const dataSubmite = {
        ...data,
        cover: coverImage
      }
      console.log('✅ Dados prontos para salvar: ', dataSubmite);

    },
    (erros) => {
      console.log('❌ O Zod bloqueou o envio! Motivo:', erros);
    }
  );

  const handleSelectOrEditImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setCoverImage(uri);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage('');
  };

  // Funções para controle do modal de criação de categoria
  const handleOpenCategoryModal = () => {
    setIsCategoryModalVisible(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalVisible(false);
    categoryMethods.reset({ new_category_name: '' });
  };

  const handleCreateCategory = categoryMethods.handleSubmit((data) => {
    const newCat: BaseSelectOption = {
      id: String(Date.now()),
      label: data.new_category_name,
    };
    setCategories((prev) => [...prev, newCat]);
    
    // Define a nova categoria criada como selecionada no formulário principal
    methods.setValue('category', newCat);
    
    handleCloseCategoryModal();
  });

  return {
    modalRef,
    methods,
    selectedColor,
    onSubmit,
    setSelectedColor,
    coverImage,
    handleSelectOrEditImage,
    handleRemoveImage,
    handleClose,
    closeModal,
    categories,
    isCategoryModalVisible,
    categoryMethods,
    handleOpenCategoryModal,
    handleCloseCategoryModal,
    handleCreateCategory,
  };
}