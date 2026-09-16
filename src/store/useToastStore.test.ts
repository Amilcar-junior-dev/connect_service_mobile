import { useToastStore, toast } from './useToastStore';

describe('useToastStore', () => {
  beforeEach(() => {
    useToastStore.getState().hideToast();
  });

  it('deve inicializar com o toast oculto', () => {
    const state = useToastStore.getState();
    expect(state.visible).toBe(false);
  });

  it('deve exibir toast de erro com os 5 requisitos (titulo, descricao, duracao, icone e onPress)', () => {
    const onPressMock = jest.fn();

    toast.error('Credenciais inválidas', {
      title: 'Falha no Login',
      duration: 5000,
      onPress: onPressMock,
    });

    const state = useToastStore.getState();
    expect(state.visible).toBe(true);
    expect(state.type).toBe('error');
    expect(state.title).toBe('Falha no Login');
    expect(state.description).toBe('Credenciais inválidas');
    expect(state.duration).toBe(5000);
    expect(state.onPress).toBe(onPressMock);
  });

  it('deve ocultar o toast ao chamar hideToast', () => {
    toast.success('Perfil salvo!');
    expect(useToastStore.getState().visible).toBe(true);

    toast.hide();
    expect(useToastStore.getState().visible).toBe(false);
  });
});
