import { supabase } from '~/lib/supabase';

export interface CreateCompanyPayload {
  companyName: string;
  slug: string;
  segment: string;
  teamSize: string;
  serviceType: string;
  zipCode?: string;
  city?: string;
  state?: string;
  address?: string;
}

export const companyService = {
  /**
   * Salva os dados da empresa no Supabase e vincula ao usuário autenticado.
   */
  async createCompany(payload: CreateCompanyPayload) {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await supabase
      .from('companies')
      .upsert(
        {
          owner_id: userData.user.id,
          company_name: payload.companyName,
          slug: payload.slug,
          segment: payload.segment,
          team_size: payload.teamSize,
          service_type: payload.serviceType,
          zip_code: payload.zipCode,
          city: payload.city,
          state: payload.state,
          address: payload.address,
          onboarding_completed: true,
        },
        { onConflict: 'owner_id' }
      )
      .select()
      .single();

    if (error) {
      throw error;
    }

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
