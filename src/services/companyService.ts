import { supabase } from '~/lib/supabase';

export interface CreateCompanyPayload {
  firstName: string;
  lastName?: string;
  avatarUrl?: string;
  specialization: string;
  workplaceName?: string;
  companyName: string;
  slug: string;
  zipCode?: string;
  city?: string;
  state?: string;
  address?: string;
  operatingHours?: Record<string, any>;
}

export const companyService = {
  /**
   * Salva os dados da empresa e do perfil do dono no Supabase.
   */
  async createCompany(payload: CreateCompanyPayload) {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      throw new Error('Usuário não autenticado');
    }

    // Salva ou atualiza a tabela companies
    const { data, error } = await supabase
      .from('companies')
      .upsert(
        {
          owner_id: userData.user.id,
          first_name: payload.firstName,
          last_name: payload.lastName,
          avatar_url: payload.avatarUrl,
          specialization: payload.specialization,
          company_name: payload.companyName,
          slug: payload.slug,
          segment: payload.specialization,
          team_size: 'solo',
          service_type: 'fixed',
          zip_code: payload.zipCode,
          city: payload.city,
          state: payload.state,
          address: payload.address,
          operating_hours: payload.operatingHours,
          onboarding_completed: true,
        },
        { onConflict: 'owner_id' }
      )
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Atualiza os metadados do usuário no Supabase Auth (incluindo avatar_url e name para o TopSheet)
    const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(' ');
    await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        avatar_url: payload.avatarUrl,
      },
    });

    return data;
  },

  /**
   * Busca as configurações da empresa do usuário atual.
   */
  async getCompanyByOwner() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return null;

    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('owner_id', userData.user.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
