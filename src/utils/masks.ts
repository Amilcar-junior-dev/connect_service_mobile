import { formatWithMask, createNumberMask } from 'react-native-mask-input';

export const currencyMaskDef = createNumberMask({
  prefix: ['R', '$', ' '],
  delimiter: '.',
  separator: ',',
  precision: 2,
});

export function formatCurrency(value?: number | string | null): string {
    if (value == null || value === '') return 'R$ 0,00';

    if (typeof value === 'string' && value.includes('R$')) {
        return value;
    }

    const numberFixed = Number(value).toFixed(2);
    const digitsOnly = numberFixed.replace(/\D/g, '');

    const { masked } = formatWithMask({
        text: digitsOnly,
        mask: currencyMaskDef,
    });

    return masked;
}