import { mapSupabaseAuthError } from './errorMapper';

describe('errorMapper', () => {
  it('deve traduzir "Invalid login credentials" para mensagem amigável em pt-BR', () => {
    const res = mapSupabaseAuthError({ message: 'Invalid login credentials' });
    expect(res.title).toBe('Credenciais Inválidas');
    expect(res.description).toContain('E-mail ou senha incorretos');
  });

  it('deve traduzir "User already registered" para aviso de e-mail cadastrado', () => {
    const res = mapSupabaseAuthError({ message: 'User already registered' });
    expect(res.title).toBe('E-mail já Cadastrado');
    expect(res.description).toContain('já está cadastrado');
  });

  it('deve traduzir erro de senha fraca', () => {
    const res = mapSupabaseAuthError({ message: 'Password should be at least 6 characters' });
    expect(res.title).toBe('Senha Fraca');
    expect(res.description).toContain('pelo menos 6 caracteres');
  });

  it('deve traduzir erro de rede / sem conexão', () => {
    const res = mapSupabaseAuthError('Network request failed');
    expect(res.title).toBe('Sem Conexão');
    expect(res.description).toContain('Sem conexão com a internet');
  });

  it('deve retornar fallback padrão quando o erro for nulo ou desconhecido', () => {
    const res = mapSupabaseAuthError(null);
    expect(res.title).toBe('Aviso');
    expect(res.description).toContain('erro inesperado');
  });
});
