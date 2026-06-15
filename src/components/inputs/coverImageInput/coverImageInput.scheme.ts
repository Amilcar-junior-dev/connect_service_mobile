export interface CoverImageInputProps {
  imageUri: string;
  onChangeImage: (uri: string) => void;
  onRemoveImage: () => void;
  label?: string;
  containerClass?: string;
}
