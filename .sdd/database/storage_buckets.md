# Mapeamento de Storage Buckets (Supabase Storage)

Documentação dos buckets de mídia para armazenar fotos de perfil, imagens de capa de serviços e logos.

---

## 🗂️ Buckets do Sistema

### 1. `avatars` (Público)
- **Finalidade:** Fotos de perfil dos colaboradores e clientes.
- **Tamanho Máximo:** 5 MB.
- **Tipos Permitidos:** `image/png`, `image/jpeg`, `image/webp`.

### 2. `company-assets` (Público)
- **Finalidade:** Logotipo da empresa e foto de capa do perfil público de agendamentos.
- **Tamanho Máximo:** 10 MB.
- **Tipos Permitidos:** `image/png`, `image/jpeg`, `image/webp`.

### 3. `service-covers` (Público)
- **Finalidade:** Foto ilustrativa/demonstrativa dos serviços oferecidos.
- **Tamanho Máximo:** 5 MB.
- **Tipos Permitidos:** `image/png`, `image/jpeg`, `image/webp`.
