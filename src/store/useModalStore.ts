import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { ModalType } from './storeScheme';
export type { ModalType };



export const useModalStore = create(
  combine(
    {
      activeModal: null as ModalType,
      modalData: null as Record<string, unknown> | null,
    },

    (set, get) => ({
      openModal: (type: NonNullable<ModalType>, data?: Record<string, unknown>) =>
        set({ activeModal: type, modalData: data || null }),

      closeModal: () =>
        set({ activeModal: null, modalData: null }),
    })
  )
);