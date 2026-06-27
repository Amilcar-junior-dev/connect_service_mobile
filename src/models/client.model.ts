export interface Client {
  id: string;
  first_name: string;
  last_name?: string;
  birth_date?: string;
  phone?: string;
  email?: string;
  profile_photo?: string; // Caminho da foto de perfil (local ou URL do storage)
  createdAt?: string;
}
