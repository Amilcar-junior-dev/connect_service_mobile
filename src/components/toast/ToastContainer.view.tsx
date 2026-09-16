import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useActiveTheme } from '~/hooks/colorScheme';
import { useToastStore, ToastVariant } from '~/store/useToastStore';
import Check from '~/assets/svg/Check.svg';
import Close from '~/assets/svg/Close.svg';
import Notification from '~/assets/svg/Notification.svg';

export function ToastContainer() {
  const { colors, vars } = useActiveTheme();
  const insets = useSafeAreaInsets();
  const { visible, type, title, description, icon, duration, onPress, hideToast } =
    useToastStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (duration && duration > 0) {
        timerRef.current = setTimeout(() => {
          hideToast();
        }, duration);
      }
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, duration, hideToast]);

  if (!visible) return null;

  // Definições de Cores e Ícones Padrão por Variante
  const getVariantStyles = (variant: ToastVariant) => {
    switch (variant) {
      case 'success':
        return {
          borderColor: 'border-emerald-500/40',
          bgColor: 'bg-surface',
          badgeBg: 'bg-emerald-500/10',
          textColor: 'text-emerald-600',
          defaultIcon: <Check width={20} height={20} color="#10b981" />,
        };
      case 'error':
        return {
          borderColor: 'border-rose-500/40',
          bgColor: 'bg-surface',
          badgeBg: 'bg-rose-500/10',
          textColor: 'text-rose-600',
          defaultIcon: <Close width={20} height={20} color="#f43f5e" />,
        };
      case 'warning':
        return {
          borderColor: 'border-amber-500/40',
          bgColor: 'bg-surface',
          badgeBg: 'bg-amber-500/10',
          textColor: 'text-amber-600',
          defaultIcon: <Notification width={20} height={20} color="#f59e0b" />,
        };
      case 'info':
      default:
        return {
          borderColor: 'border-sky-500/40',
          bgColor: 'bg-surface',
          badgeBg: 'bg-sky-500/10',
          textColor: 'text-sky-600',
          defaultIcon: <Notification width={20} height={20} color="#0284c7" />,
        };
    }
  };

  const styleConfig = getVariantStyles(type);

  const handlePressToast = () => {
    if (onPress) {
      onPress();
    }
    hideToast();
  };

  return (
    <Animated.View
      entering={SlideInUp.duration(250)}
      exiting={SlideOutUp.duration(200)}
      style={[vars, { paddingTop: insets.top + 8 }]}
      className="absolute top-0 left-0 right-0 z-50 px-4 pointer-events-box-none"
    >
      <TouchableOpacity
        activeOpacity={onPress ? 0.8 : 0.95}
        onPress={handlePressToast}
        className={`w-full flex-row items-center p-3.5 rounded-2xl border ${styleConfig.borderColor} ${styleConfig.bgColor} shadow-lg shadow-black/10 elevation-md`}
      >
        {/* Ícone no Canto Esquerdo */}
        <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${styleConfig.badgeBg}`}>
          {icon || styleConfig.defaultIcon}
        </View>

        {/* Conteúdo: Título & Descrição */}
        <View className="flex-1 pr-2">
          {title ? (
            <Text className="text-sm font-robotoBold text-ink font-bold mb-0.5">
              {title}
            </Text>
          ) : null}
          <Text className="text-xs font-robotoRegular text-ink/80 leading-4">
            {description}
          </Text>
        </View>

        {/* Botão Fechar (X) */}
        <TouchableOpacity
          onPress={hideToast}
          activeOpacity={0.7}
          className="p-1 -mr-1 rounded-full opacity-60 active:opacity-100"
        >
          <Close width={16} height={16} color={colors?.ink} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}
