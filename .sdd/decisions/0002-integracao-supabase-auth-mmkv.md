# 0002 - Integração do Supabase, Armazenamento Síncrono (MMKV) e Migrações de Banco de Dados

## Status
- **Aprovada**

## Contexto
O aplicativo necessitava de uma infraestrutura de backend realista para suportar criação de contas, login seguro com JWT, e persistência dos dados de negócio (serviços, clientes, agendamentos e equipe). O **Supabase** foi escolhido por ser um Backend as a Service (BaaS) robusto baseado em PostgreSQL. 

No entanto, a documentação oficial do Supabase para React Native sugere o uso do `AsyncStorage` para persistir sessões de login. Como o `AsyncStorage` é assíncrono e lento, precisávamos de uma solução síncrona mais veloz que aproveitasse o `react-native-mmkv` já configurado no projeto. 

Além disso, para gerenciar as tabelas de banco de dados de forma escalável e profissional sem poluir o computador local com contêineres Docker pesados (que consomem muita RAM, CPU e disco no macOS), precisávamos de um fluxo de migrações leve e seguro direto para a nuvem.

## Decisão
Tomamos as seguintes decisões técnicas e de infraestrutura:

1. **SDK e Polyfills**:
   - Instalamos `@supabase/supabase-js` e `react-native-url-polyfill`. Este último é importado no topo do arquivo do cliente para garantir compatibilidade da classe `URL` do React Native com os requisitos do SDK.

2. **Adaptador MMKV no Supabase Auth**:
   - Criamos um adaptador customizado de armazenamento em `src/lib/supabase.ts` que mapeia as chamadas do cliente Supabase para o `react-native-mmkv` (usando uma instância isolada com o ID `'supabase-auth-storage'`). Isso elimina a necessidade de instalar e usar a biblioteca `AsyncStorage`, tornando a leitura dos tokens de sessão síncrona e ultra-rápida.

3. **Sincronização Reativa com Zustand**:
   - Integramos a Zustand store global `useAuthStore.ts` com o listener `supabase.auth.onAuthStateChange`. Toda vez que o status de login muda no Supabase (SignIn, SignOut, Token Refreshed), a store global atualiza seus estados de forma reativa. Mantemos o middleware `persist` na store de autenticação para permitir que as rotas do Expo Router leiam o token instantaneamente do disco na inicialização do app, evitando "flashes" de login e garantindo um redirecionamento imediato para a Home.

4. **Gerenciamento de Infraestrutura (Sem Docker)**:
   - Configuramos e linkamos a **Supabase CLI** diretamente com a nossa nuvem de desenvolvimento. 
   - Gerenciaremos o banco de dados usando **Migrações (Migrations)** locais em arquivos SQL na pasta `supabase/migrations/` e aplicaremos as alterações diretamente na nuvem usando o comando `supabase db push`. Não usaremos contêineres do Docker locais para economizar espaço de armazenamento e memória de processamento da máquina de desenvolvimento.

## Consequências
- A sessão e os dados do usuário são mantidos na nuvem de forma segura e criptografada com JWT, enquanto o cache da sessão local é gravado em C++ via MMKV.
- O desenvolvedor não precisa gerenciar manualmente o anexo de tokens ou a expiração deles nas chamadas ao banco; o próprio SDK do Supabase cuida disso de forma transparente.
- Todas as novas tabelas de banco de dados (`services`, `clients`, `employees`, `appointments`) devem obrigatoriamente ser criadas como migrações na pasta `supabase/migrations/` e aplicadas via terminal, garantindo versionamento do banco junto ao Git do código-fonte.
