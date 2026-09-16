export interface MappedError {
  title: string;
  description: string;
}

/**
 * Mapeia erros em inglês do Supabase Auth e da API para mensagens amigáveis em pt-BR.
 */
export function mapSupabaseAuthError(error: any): MappedError {
  if (!error) {
    return {
      title: 'Aviso',
      description: 'Ocorreu um erro inesperado. Tente novamente em instantes.',
    };
  }

  const rawMessage = typeof error === 'string' ? error : error?.message || error?.error_description || '';
  const lowerMsg = rawMessage.toLowerCase();

  if (lowerMsg.includes('invalid login credentials') || lowerMsg.includes('invalid_credentials')) {
    return {
      title: 'Credenciais Inválidas',
      description: 'E-mail ou senha incorretos. Verifique seus dados e tente novamente.',
    };
  }

  if (lowerMsg.includes('user already registered') || lowerMsg.includes('user_already_exists')) {
    return {
      title: 'E-mail já Cadastrado',
      description: 'Este e-mail já está cadastrado em nossa plataforma. Tente fazer login.',
    };
  }

  if (lowerMsg.includes('password should be at least') || lowerMsg.includes('weak_password')) {
    return {
      title: 'Senha Fraca',
      description: 'A senha deve possuir pelo menos 6 caracteres.',
    };
  }

  if (lowerMsg.includes('email not confirmed')) {
    return {
      title: 'E-mail Não Confirmado',
      description: 'Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada.',
    };
  }

  if (lowerMsg.includes('auth session missing') || lowerMsg.includes('session_expired')) {
    return {
      title: 'Sessão Expirada',
      description: 'Sua sessão expirou. Faça login novamente para continuar.',
    };
  }

  if (lowerMsg.includes('unable to validate email address') || lowerMsg.includes('invalid email')) {
    return {
      title: 'E-mail Inválido',
      description: 'O formato do e-mail digitado é inválido.',
    };
  }

  if (lowerMsg.includes('network request failed') || lowerMsg.includes('failed to fetch')) {
    return {
      title: 'Sem Conexão',
      description: 'Sem conexão com a internet. Verifique sua rede e tente novamente.',
    };
  }

  if (lowerMsg.includes('too many requests') || lowerMsg.includes('rate limit')) {
    return {
      title: 'Muitas Tentativas',
      description: 'Muitas tentativas em pouco tempo. Aguarde alguns instantes e tente novamente.',
    };
  }

  return {
    title: 'Ops!',
    description: rawMessage || 'Ocorreu um erro inesperado. Tente novamente em instantes.',
  };
}
