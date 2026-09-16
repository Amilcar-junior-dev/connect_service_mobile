import { create } from 'zustand';
import React from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  type?: ToastVariant;
  title?: string;
  description?: string;
  message?: string; // alias/fallback para description
  icon?: React.ReactNode;
  duration?: number; // ms, ex: 4000
  onPress?: () => void;
}

export interface ToastState {
  visible: boolean;
  type: ToastVariant;
  title?: string;
  description: string;
  icon?: React.ReactNode;
  duration: number;
  onPress?: () => void;

  showToast: (options: ToastOptions | string) => void;
  hideToast: () => void;

  error: (description: string, options?: Omit<ToastOptions, 'description' | 'type'>) => void;
  success: (description: string, options?: Omit<ToastOptions, 'description' | 'type'>) => void;
  warning: (description: string, options?: Omit<ToastOptions, 'description' | 'type'>) => void;
  info: (description: string, options?: Omit<ToastOptions, 'description' | 'type'>) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  visible: false,
  type: 'info',
  title: undefined,
  description: '',
  icon: undefined,
  duration: 4000,
  onPress: undefined,

  showToast: (options) => {
    if (typeof options === 'string') {
      set({
        visible: true,
        type: 'info',
        title: undefined,
        description: options,
        icon: undefined,
        duration: 4000,
        onPress: undefined,
      });
      return;
    }

    const {
      type = 'info',
      title,
      description = options.message || '',
      icon,
      duration = 4000,
      onPress,
    } = options;

    set({
      visible: true,
      type,
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
      type: 'error',
      description,
      ...options,
    });
  },

  success: (description, options) => {
    get().showToast({
      type: 'success',
      description,
      ...options,
    });
  },

  warning: (description, options) => {
    get().showToast({
      type: 'warning',
      description,
      ...options,
    });
  },

  info: (description, options) => {
    get().showToast({
      type: 'info',
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
