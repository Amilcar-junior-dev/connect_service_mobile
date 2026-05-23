// src/hooks/useImagePicker.ts
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export function useImagePicker() {
  const pickImage = async () => {
    try {
      // 1. Permissão amigável
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Acesso negado', 'Precisamos de acesso à galeria para escolher a foto.');
        return null;
      }

      // 2. Abertura e Compressão
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false, // Deixa o usuário cortar a foto
        aspect: [1, 1], // Quadrado
        quality: 0.7, // Comprime 30% sem perder qualidade visual
        
      });

      if (result.canceled) return null;

      const file = result?.assets?.[0];
      
      // 3. Trava de 5MB
      if (file.fileSize && file.fileSize > 5 * 1024 * 1024) {
        Alert.alert('Ops!', 'A imagem é muito grande. Escolha uma foto de até 5MB.');
        return null;
      }

      return file?.uri ;
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar a imagem.');
      return null;
    }
  };

  return { pickImage };
}