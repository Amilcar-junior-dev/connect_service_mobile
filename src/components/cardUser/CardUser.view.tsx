import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useActiveTheme } from '~/hooks/colorScheme';
import User from '~/assets/svg/User.svg';
import { useCardUserViewModel } from './CardUser.viewModel';
import { cn } from '~/utils/cx';

export interface CardUserProps {
  name: string;
  imageUrl?: string | null;
  onPress?: () => void;
  containerClass?: string;
}

const CardUserComponent = ({ 
  name, 
  imageUrl, 
  onPress, 
  containerClass 
}: CardUserProps) => {
  const { colors } = useActiveTheme();
  const vm = useCardUserViewModel({ name, imageUrl, onPress });

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      className={cn(
        `flex-row items-center h-14 p-2 bg-surface rounded-xl border border-divider shadow-sm mt-2`,
        containerClass || ``
      )}
    >
      <View>
        {vm.imageUrl ? (
          <Image
            source={{ uri: vm.imageUrl }}
            className={`w-full h-full`}
            resizeMode="cover"
          />
        ) : (
          <User color={colors.ink} width={28} height={28} />
        )}
      </View>

      <View className={`ml-4 flex-1`}>
        <Text 
          className={`text-ink text-lg font-robotoMedium`}
          numberOfLines={1}
        >
          {vm.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const CardUser = memo(CardUserComponent);
