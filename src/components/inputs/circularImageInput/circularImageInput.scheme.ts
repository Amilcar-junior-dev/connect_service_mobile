import React from 'react';

export interface CircularImageInputProps {
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
