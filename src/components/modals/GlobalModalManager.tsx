import React from 'react';
import { ModalType, useModalStore } from '~/store/useModalStore';
import { useShallow } from 'zustand/react/shallow';
import { ModalNewService } from './modalsServices/newService/ModalNewService.view';
// import { ClientModal } from '~/components/ClientModal/ClientModal';

// 1. O Dicionário de Modais (Registro)
// A chave tem que bater exatamente com o seu tipo ModalType do Zustand.
// const MODAL_REGISTRY: Record<NonNullable<import('~/store/useModalStore').ModalType>, React.ElementType> 
const MODAL_REGISTRY: Record<NonNullable<ModalType>, React.ElementType> = {
  SERVICE: ModalNewService,
  CLIENT: () => null, // Placeholder para quando você criar
  FILTER: () => null, // Placeholder para quando você criar
};

export function GlobalModalManager() {
  // 2. Escuta o estado global focando na performance (useShallow)
  const { activeModal, modalData } = useModalStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
      modalData: state.modalData,
    }))
  );
  console.log("🚀 ~ GlobalModalManager.tsx:24 ~ GlobalModalManager ~ activeModal:", activeModal)

  // 3. Curto-Circuito: Se a Store disser que não tem modal aberto, não renderiza NADA.
  if (!activeModal) return null;

  // 4. Busca dinamicamente qual componente renderizar baseado na chave ('SERVICE', etc)
  const SpecificModalComponent = MODAL_REGISTRY[activeModal];

  // 5. Instancia o Modal, passando os dados caso eles existam
  return <SpecificModalComponent data={modalData} />;
}