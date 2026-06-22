import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SERVICE_COLORS } from '~/styles/colors';
import Check from '~/assets/svg/Check.svg';
import { cn } from '~/utils/cx';

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  colors?: string[];
  label?: string;
  containerClass?: string;
  labelClass?: string;
}

export function ColorPicker({
  selectedColor,
  onSelectColor,
  colors = SERVICE_COLORS,
  label,
  containerClass,
  labelClass,
}: ColorPickerProps) {
  return (
    <View className={cn(`mb-4 w-full`, containerClass)}>
      {label && (
        <Text className={cn(`text-ink text-lg mb-2`, labelClass)}>
          {label}
        </Text>
      )}
      <View className={`flex-row flex-wrap gap-2 mt-1 w-full justify-center`}>
        {colors.map((color, index) => {
          const isSelected = selectedColor?.toLowerCase() === color?.toLowerCase();
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onSelectColor(color)}
              className={`w-6 h-6 rounded-md items-center justify-center`}
              style={{ backgroundColor: color }}
              activeOpacity={0.7}
            >
              {isSelected && (
                <Check color="#FFFFFF" width={14} height={14} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
