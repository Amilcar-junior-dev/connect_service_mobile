import { useWatch, useFormContext } from 'react-hook-form';
import { ImageProps, ImageSourcePropType } from 'react-native';
import { CardService } from '~/components/cardService/CardService.view';

export function CardServicePreview({ color, selectedImage }: { color: string , selectedImage: string}) {
    const { control } = useFormContext();

    const previewTitle = useWatch({ control, name: 'service_name' }) || 'Prévia do serviço';
    const previewHours = useWatch({ control, name: 'time_hours' }) || 0;
    const previewMinutes = useWatch({ control, name: 'time_minuts' }) || 0;
    const previewValue = useWatch({ control, name: 'service_value' }) || 0;

    return (
        <CardService  
            color={color}
            cardImage={selectedImage}
            title={previewTitle}
            hours={Number(previewHours)} 
            minutes={Number(previewMinutes)}
            value={previewValue}
        />
    );
}