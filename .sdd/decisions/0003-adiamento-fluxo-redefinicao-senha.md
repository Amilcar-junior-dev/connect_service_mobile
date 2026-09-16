# 0003 - Adiamento da Redefinição de Senha via Deep Linking no Aplicativo Móvel

## Status
- **Aprovada**

## Contexto
O fluxo de redefinição de senha no Supabase funciona enviando um link temporário para o e-mail do usuário. Para que o usuário digite a nova senha de forma segura dentro do aplicativo, o link clicado no celular deve abrir automaticamente o app Connect Service em uma rota específica (ex: `connectservice://reset-password`). 

No entanto, a configuração do Deep Linking nativo exige:
1. Configurações nativas adicionais no iOS (URL Schemes no Xcode) e no Android (Intent Filters no `AndroidManifest.xml`).
2. Desenvolvimento de uma tela dedicada de redefinição de senha (`src/app/reset-password.tsx`) no app.
3. Ajuste de certificados de domínio associado no console do Supabase.

Como essa funcionalidade adiciona complexidade de infraestrutura e não é um bloqueador para o desenvolvimento e testes do fluxo principal (Login, Cadastro e persistência de dados de negócio), decidimos priorizar outras frentes de valor imediato para o MVP.

## Decisão
Decidimos **adiar** a implementação do fluxo completo de redefinição de senha (Caminho com Deep Links nativos) para uma fase futura do projeto. 

Nesta fase:
1. A modal de recuperação de senha (`ModalRecoverPassword.view.tsx`) faz a chamada oficial do SDK do Supabase (`supabase.auth.resetPasswordForEmail`), garantindo que o disparo do e-mail funcione no backend.
2. A URL de redirecionamento (**Site URL**) no console do Supabase está configurada para um site público e ativo (como `https://google.com`), servindo apenas para validar o funcionamento do token e evitar erros de *localhost recusado* no navegador do usuário de teste.
3. A troca de senha em si (digitar a nova senha dentro do app) será implementada posteriormente quando o setup de deep link for configurado.

## Consequências
- A modal de recuperação está integrada e coberta por testes unitários simulando sucessos e falhas de envio da API.
- A experiência final de alteração de senha fica inativa temporariamente (o usuário cai na home do Google ao clicar no link do e-mail).
- O desenvolvimento do app pode seguir imediatamente para o escopo principal: modelagem do banco de dados relacional e a integração offline-first com o Supabase para Clientes, Serviços e Agendamentos.
