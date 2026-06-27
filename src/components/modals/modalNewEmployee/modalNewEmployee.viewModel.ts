import { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { useAppForm } from '~/hooks/useAppForm';
import { useImagePicker } from '~/hooks/useImagePicker';
import { useModalStore } from '~/store/useModalStore';
import { useEmployeeStore } from '~/store/useEmployeeStore';
import { EmployeeSchema } from './modalNewEmployee.schema';

export function useModalNewEmployeeViewModel() {
  const modalRef = useRef<Modalize>(null);
  const methods = useAppForm({
    schema: EmployeeSchema,
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const closeModal = useModalStore((state) => state.closeModal);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
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
      addEmployee({
        name: data.name,
        email: data.email,
        imageUrl: profileImage || null,
        createdAt: new Date().toISOString(),
      });
      console.log('✅ Funcionário salvo com sucesso');
      handleClose();
    },
    (errors) => {
      console.log('❌ Validação do formulário de funcionário:', errors);
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
