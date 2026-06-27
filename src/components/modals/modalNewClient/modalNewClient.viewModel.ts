import { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';

import { useAppForm } from '~/hooks/useAppForm';
import { useImagePicker } from '~/hooks/useImagePicker';
import { useClientStore } from '~/store/useClientStore';
import { useModalStore } from '~/store/useModalStore';
import { ClientSchema } from './modalNewClient.schema';

export function useModalNewClientViewModel() {
  const modalRef = useRef<Modalize>(null);
  const methods = useAppForm({
    schema: ClientSchema,
    defaultValues: {
      first_name: '',
      last_name: '',
      birth_date: '',
      phone: '',
      email: '',
      save_to_contacts: true,
    },
  });

  const closeModal = useModalStore((state) => state.closeModal);
  const addClient = useClientStore((state) => state.addClient);
  const [profileImage, setProfileImage] = useState('');
  const { pickImage } = useImagePicker();

  useEffect(() => {
    modalRef.current?.open();
  }, []);

  const handleClose = () => {
    modalRef.current?.close();
  };

  const onSubmit = methods.handleSubmit(
    (data) => {
      const { save_to_contacts, ...clientData } = data;
      addClient({
        ...clientData,
        profile_photo: profileImage,
        createdAt: new Date().toISOString(),
      });
      console.log('✅ Cliente salvo com sucesso');
      handleClose();
    },
    (errors) => {
      console.log('❌ Validação do formulário:', errors);
    }
  );

  const handleSelectOrEditImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setProfileImage(uri);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage('');
  };

  return {
    modalRef,
    methods,
    profileImage,
    setProfileImage,
    onSubmit,
    handleSelectOrEditImage,
    handleRemoveImage,
    handleClose,
    closeModal,
  };
}
