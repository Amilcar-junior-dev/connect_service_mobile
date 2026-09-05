export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          owner_id: string;
          company_name: string;
          slug: string;
          segment: string;
          team_size: string;
          service_type: string;
          zip_code: string | null;
          city: string | null;
          state: string | null;
          address: string | null;
          logo_url: string | null;
          cover_url: string | null;
          primary_color: string | null;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          company_name: string;
          slug: string;
          segment: string;
          team_size: string;
          service_type: string;
          zip_code?: string | null;
          city?: string | null;
          state?: string | null;
          address?: string | null;
          logo_url?: string | null;
          cover_url?: string | null;
          primary_color?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          company_name?: string;
          slug?: string;
          segment?: string;
          team_size?: string;
          service_type?: string;
          zip_code?: string | null;
          city?: string | null;
          state?: string | null;
          address?: string | null;
          logo_url?: string | null;
          cover_url?: string | null;
          primary_color?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      service_categories: {
        Row: {
          id: string;
          company_id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          name?: string;
          created_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          company_id: string;
          category_id: string | null;
          name: string;
          description: string | null;
          price: number;
          duration_minutes: number;
          color: string | null;
          cover_image_url: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          category_id?: string | null;
          name: string;
          description?: string | null;
          price?: number;
          duration_minutes?: number;
          color?: string | null;
          cover_image_url?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          category_id?: string | null;
          name?: string;
          description?: string | null;
          price?: number;
          duration_minutes?: number;
          color?: string | null;
          cover_image_url?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      employees: {
        Row: {
          id: string;
          company_id: string;
          name: string;
          email: string | null;
          phone: string | null;
          avatar_url: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          active?: boolean;
          created_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          company_id: string;
          name: string;
          email: string | null;
          phone: string;
          avatar_url: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          name: string;
          email?: string | null;
          phone: string;
          avatar_url?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          name?: string;
          email?: string | null;
          phone?: string;
          avatar_url?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          company_id: string;
          client_id: string | null;
          employee_id: string | null;
          appointment_date: string;
          start_time: string;
          end_time: string;
          total_price: number;
          status: string;
          notes: string | null;
          reminder_option: string | null;
          repeat_option: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          client_id?: string | null;
          employee_id?: string | null;
          appointment_date: string;
          start_time: string;
          end_time: string;
          total_price?: number;
          status?: string;
          notes?: string | null;
          reminder_option?: string | null;
          repeat_option?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          client_id?: string | null;
          employee_id?: string | null;
          appointment_date?: string;
          start_time?: string;
          end_time?: string;
          total_price?: number;
          status?: string;
          notes?: string | null;
          reminder_option?: string | null;
          repeat_option?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
