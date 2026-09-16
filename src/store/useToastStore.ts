import { create } from 'zustand';
import { ToastVariant, ToastOptions, ToastState } from '~/types/toast.types';

export { ToastVariant, ToastOptions, ToastState };

export const useToastStore = create<ToastState>((set, get) => ({
  visible: false,
  type: ToastVariant.INFO,
  title: undefined,
  description: '',
  icon: undefined,
  duration: 4000,
  onPress: undefined,

  showToast: (options) => {
    if (typeof options === 'string') {
      set({
        visible: true,
        type: ToastVariant.INFO,
        title: undefined,
        description: options,
        icon: undefined,
        duration: 4000,
        onPress: undefined,
      });
      return;
    }

    const {
      type = ToastVariant.INFO,
      title,
      description = options.message || '',
      icon,
      duration = 4000,
      onPress,
    } = options;

    set({
      visible: true,
      type: type as ToastVariant,
      title,
      description,
      icon,
      duration,
      onPress,
    });
  },

  hideToast: () => {
    set({ visible: false });
  },

  error: (description, options) => {
    get().showToast({
      type: ToastVariant.ERROR,
      description,
      ...options,
    });
  },

  success: (description, options) => {
    get().showToast({
      type: ToastVariant.SUCCESS,
      description,
      ...options,
    });
  },

  warning: (description, options) => {
    get().showToast({
      type: ToastVariant.WARNING,
      description,
      ...options,
    });
  },

  info: (description, options) => {
    get().showToast({
      type: ToastVariant.INFO,
      description,
      ...options,
    });
  },
}));

// Atalho imperativo rápido para ser utilizado em qualquer arquivo
export const toast = {
  show: (options: ToastOptions | string) => useToastStore.getState().showToast(options),
  hide: () => useToastStore.getState().hideToast(),
  error: (description: string, options?: Omit<ToastOptions, 'description' | 'type'>) =>
    useToastStore.getState().error(description, options),
  success: (description: string, options?: Omit<ToastOptions, 'description' | 'type'>) =>
    useToastStore.getState().success(description, options),
  warning: (description: string, options?: Omit<ToastOptions, 'description' | 'type'>) =>
    useToastStore.getState().warning(description, options),
  info: (description: string, options?: Omit<ToastOptions, 'description' | 'type'>) =>
    useToastStore.getState().info(description, options),
};
