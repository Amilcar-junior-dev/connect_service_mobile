// src/utils/masks.ts
import { formatWithMask, createNumberMask } from 'react-native-mask-input';

// 1. Exportamos a máscara para que o Input possa usar
export const currencyMaskDef = createNumberMask({
  prefix: ['R', '$', ' '],
  delimiter: '.',
  separator: ',',
  precision: 2,
});

// 2. Nossa função blindada para usar no CardService ou em qualquer Text
export function formatCurrency(value?: number | string | null): string {
    if (value == null || value === '') return 'R$ 0,00';

    // CENÁRIO A: O valor veio do Input em tempo real
    // Como o MaskInput já salva com "R$", nós apenas devolvemos o valor como está!
    if (typeof value === 'string' && value.includes('R$')) {
        return value;
    }

    // CENÁRIO B: O valor veio do Banco de Dados / API (Ex: 1500 ou 1500.50)
    // Precisamos transformar o número em string, garantir 2 casas decimais, 
    // remover o ponto e passar para a máscara formatar.
    // Ex: 1500 -> "1500.00" -> "150000" -> "R$ 1.500,00"
    const numberFixed = Number(value).toFixed(2);
    const digitsOnly = numberFixed.replace(/\D/g, '');

    const { masked } = formatWithMask({
        text: digitsOnly,
        mask: currencyMaskDef, // Usa a mesma regra do input!
    });

    return masked;
}