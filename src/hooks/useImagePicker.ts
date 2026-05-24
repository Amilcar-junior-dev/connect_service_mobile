import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export function useImagePicker() {
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Acesso negado', 'Precisamos de acesso à galeria para escolher a foto.');
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        aspect: [1, 1],
        quality: 0.7,
        
      });

      if (result.canceled) return null;

      const file = result?.assets?.[0];
      
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