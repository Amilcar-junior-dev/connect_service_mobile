import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useImagePicker } from '~/hooks/useImagePicker';
import { useActiveTheme } from '~/hooks/colorScheme';
import Contact from '~/assets/svg/Contact.svg';
import SearchImage from '~/assets/svg/SearchImage.svg';
import Edit from '~/assets/svg/Edit.svg';
import Trash from '~/assets/svg/Trash.svg';
import { cn } from '~/utils/cx';

interface CircularImageInputProps {
  imageUri: string;
  onChangeImage: (uri: string) => void;
  onRemoveImage: () => void;
  label?: string;
  description?: string;
  recommendation?: string;
  containerClass?: string;
  sizeClass?: string;
  iconSize?: number;
  placeholderIcon?: React.ReactNode;
}

export function CircularImageInput({
  imageUri,
  onChangeImage,
  onRemoveImage,
  label,
  description,
  recommendation,
  containerClass,
  sizeClass = `w-20 h-20`,
  iconSize = 32,
  placeholderIcon,
}: CircularImageInputProps) {
  const { colors } = useActiveTheme();
  const { pickImage } = useImagePicker();

  const handlePick = async () => {
    const uri = await pickImage();
    if (uri) {
      onChangeImage(uri);
    }
  };

  const hasImage = !!imageUri;

  return (
    <View className={cn(`flex-row items-center gap-x-4 mb-4 w-full`, containerClass)}>
      {/* Circle Image Selector */}
      <View className={cn(`relative`, sizeClass)}>
        <TouchableOpacity
          onPress={handlePick}
          activeOpacity={0.8}
          className={cn(
            `w-full h-full rounded-full overflow-hidden items-center justify-center border-2 bg-ink`,
            hasImage ? `border-accent` : `border-muted`
          )}
        >
          {hasImage ? (
            <Image
              source={{ uri: imageUri }}
              className={`w-full h-full`}
              resizeMode={`cover`}
            />
          ) : (
            placeholderIcon || <Contact height={iconSize} width={iconSize} color={colors?.surface} />
          )}
        </TouchableOpacity>

        {/* Change Icon Overlay */}
        <TouchableOpacity
          onPress={handlePick}
          activeOpacity={0.8}
          className={`absolute bottom-0 right-0 w-7 h-7 rounded-full border border-ink bg-surface items-center justify-center shadow-sm`}
        >
          {hasImage ? (
            <Edit color={colors.ink} height={12} width={12} />
          ) : (
            <SearchImage color={colors.ink} height={12} width={12} />
          )}
        </TouchableOpacity>

        {/* Remove Icon Overlay */}
        {hasImage && (
          <TouchableOpacity
            onPress={onRemoveImage}
            activeOpacity={0.8}
            className={`absolute top-0 right-0 w-7 h-7 rounded-full border border-danger bg-surface items-center justify-center shadow-sm`}
          >
            <Trash color={colors.danger} height={13} width={13} />
          </TouchableOpacity>
        )}
      </View>

      {/* Description Details (rendered only if text label or description is present) */}
      {(label || description || recommendation) && (
        <View className={`flex-1 justify-center gap-y-0.5`}>
          {label && (
            <Text className={`text-base font-semibold text-ink font-robotoMedium`}>
              {label}
            </Text>
          )}
          {description && (
            <Text className={`text-xs text-muted font-robotoRegular`}>
              {description}
            </Text>
          )}
          {recommendation && (
            <Text className={`text-xs text-muted font-robotoRegular`}>
              {recommendation}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
