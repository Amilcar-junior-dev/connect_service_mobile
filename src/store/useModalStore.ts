import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type ModalType = 'SERVICE' | 'CLIENT' | 'FILTER' | null;

// Olha como fica limpo: O create() fica vazio, sem <Interface>
export const useModalStore = create(
  combine(
    // 1º Argumento: O Estado Inicial fortemente tipado
    { 
      activeModal: null as ModalType, 
      // Usamos Record no lugar do any para manter o código Sênior
      modalData: null as Record<string, unknown> | null, 
    }, 
    
    // 2º Argumento: As Ações (Actions)
    (set, get) => ({
      openModal: (type: NonNullable<ModalType>, data?: Record<string, unknown>) => 
        // ⬅️ Aperte Ctrl+Espaço dentro das chaves do set! 
        // O TS vai sugerir 'activeModal' e 'modalData' perfeitamente.
        set({ activeModal: type, modalData: data || null }),
      
      closeModal: () => 
        set({ activeModal: null, modalData: null }),
    })
  )
);