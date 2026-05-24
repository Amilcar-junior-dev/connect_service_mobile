import React from 'react';
import { ModalType, useModalStore } from '~/store/useModalStore';
import { useShallow } from 'zustand/react/shallow';
import { ModalNewService } from './modalsServices/newService/ModalNewService.view';
const MODAL_REGISTRY: Record<NonNullable<ModalType>, React.ElementType> = {
  SERVICE: ModalNewService,
  CLIENT: () => null,
  FILTER: () => null,
};

export function GlobalModalManager() {
  const { activeModal, modalData } = useModalStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
      modalData: state.modalData,
    }))
  );
  console.log("🚀 ~ GlobalModalManager.tsx:24 ~ GlobalModalManager ~ activeModal:", activeModal)

  if (!activeModal) return null;

  const SpecificModalComponent = MODAL_REGISTRY[activeModal];

  return <SpecificModalComponent data={modalData} />;
}