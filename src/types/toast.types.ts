import React from 'react';

/**
 * Enum global para os tipos/variantes de Toast e feedbacks do sistema.
 */
export enum ToastVariant {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

/**
 * Opções de configuração para disparo de Toast.
 */
export interface ToastOptions {
  type?: ToastVariant | 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  message?: string; // alias/fallback para description
  icon?: React.ReactNode;
  duration?: number; // duração em ms (ex: 4000)
  onPress?: () => void;
}

/**
 * Estado global e métodos da store do Toast.
 */
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
