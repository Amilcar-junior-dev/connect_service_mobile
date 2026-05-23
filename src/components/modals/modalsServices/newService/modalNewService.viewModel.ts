import { useEffect, useRef, useState } from 'react';
import { useAppForm } from '~/hooks/useAppForm';
import { ExpenseSchema } from './modalNewService.schema';
import { useImagePicker } from '~/hooks/useImagePicker';
import { useModalStore } from '~/store/useModalStore';
import { Modalize } from 'react-native-modalize';

export function useModalNewServiceViewModel() {
    const modalRef = useRef<Modalize>(null);
    const methods = useAppForm({ schema: ExpenseSchema });

    const closeModal = useModalStore((state) => state.closeModal);
    const modalVisible = useModalStore((state)=> state.activeModal)

    const [selectedColor, setSelectedColor] = useState<string>('#969E9E');
    const [coverImage, setCoverImage] = useState<string>('');
  
    const { pickImage } = useImagePicker();

    useEffect(() => {
      modalRef.current?.open();
    }, []);

    const handleClose = () => {
      modalRef.current?.close();
    };
  
    const onSubmit = methods.handleSubmit(
      // 1. Quando tudo está CERTO
      (data) => {
        const dataSubmite = {
          ...data,
          cover: coverImage
        }
        console.log('✅ Dados prontos para salvar: ', dataSubmite);

      },
      // 2. Quando o Zod BARRAR algo (Opcional, mas ótimo para debugar)
      (erros) => {
        console.log('❌ O Zod bloqueou o envio! Motivo:', erros);
      }
    );
  
  
  
    const handleSelectOrEditImage = async () => {
      const uri = await pickImage();
      if (uri) {
        setCoverImage(uri); // Salva a imagem na tela
      }
    };
  
    const handleRemoveImage = () => {
      setCoverImage(''); // Limpa a imagem
    };
  
  
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
    };
}