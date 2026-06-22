import React, { ReactNode } from 'react';
import { 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  ScrollViewProps, 
  View 
} from 'react-native';
import { useActiveTheme } from '~/hooks/colorScheme';

interface FormScrollContainerProps extends ScrollViewProps {
  children: ReactNode;
}

export function FormScrollContainer({ children, ...rest }: FormScrollContainerProps) {
  const { colors } = useActiveTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.surface }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        {...rest}
      >
        <View className={`flex-1`}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}