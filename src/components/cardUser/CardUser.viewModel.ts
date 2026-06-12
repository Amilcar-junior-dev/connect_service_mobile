import { CardUserProps } from './CardUser.view';

export function useCardUserViewModel(props: CardUserProps) {
    /**
     * ViewModel para gerenciar lógica de estado ou transformações de dados do CardUser.
     * Por enquanto, apenas repassa as props, mas centraliza a lógica de negócio aqui.
     */
    return {
        ...props,
    };
}
