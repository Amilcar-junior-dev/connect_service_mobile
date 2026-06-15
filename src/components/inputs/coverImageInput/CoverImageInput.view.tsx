import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useImagePicker } from '~/hooks/useImagePicker';
import { useActiveTheme } from '~/hooks/colorScheme';
import WithoutImage from '~/assets/svg/WithoutImage.svg';
import SearchImage from '~/assets/svg/SearchImage.svg';
import Edit from '~/assets/svg/Edit.svg';
import Trash from '~/assets/svg/Trash.svg';
import { cn } from '~/utils/cx';
import { CoverImageInputProps } from './coverImageInput.scheme';

export function CoverImageInput({
  imageUri,
  onChangeImage,
  onRemoveImage,
  label,
  containerClass,
}: CoverImageInputProps) {
  const { colors } = useActiveTheme();
  const { pickImage } = useImagePicker();

  const handlePick = async () => {
    const uri = await pickImage();
    if (uri) {
      onChangeImage(uri);
    }
  };

  return (
    <View className={cn(`mb-4 w-full`, containerClass)}>
      {label && (
        <Text className={`text-ink text-sm font-normal mb-1 font-robotoMedium`}>
          {label}
        </Text>
      )}

      <View className={`relative w-full h-32 rounded-xl overflow-hidden border border-stone/50 bg-stone/10`}>
        {imageUri ? (
          <>
            <Image
              source={{ uri: imageUri }}
              className={`w-full h-full`}
              resizeMode={`cover`}
            />
            {/* Absolute overlay controls for premium look */}
            <View className={`absolute top-2 right-2 flex-row gap-x-2`}>
              <TouchableOpacity
                onPress={handlePick}
                activeOpacity={0.8}
                className={`w-8 h-8 rounded-full bg-surface border border-ink items-center justify-center shadow-md active:scale-95`}
              >
                <Edit color={colors.ink} height={14} width={14} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onRemoveImage}
                activeOpacity={0.8}
                className={`w-8 h-8 rounded-full bg-surface border border-danger items-center justify-center shadow-md active:scale-95`}
              >
                <Trash color={colors.danger} height={14} width={14} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            onPress={handlePick}
            activeOpacity={0.7}
            className={`w-full h-full items-center justify-center flex-row`}
          >
            <View className={`items-center justify-center`}>
              <WithoutImage height={32} width={32} color={colors.muted} />
            </View>
            <View className={`absolute bottom-2 right-2 w-8 h-8 rounded-full bg-surface border border-ink items-center justify-center shadow-sm`}>
              <SearchImage color={colors.ink} height={14} width={14} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

