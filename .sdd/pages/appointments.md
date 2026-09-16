# Contexto da Tela: Agendamentos (`appointments`)

## 📌 Identificação e Rota
- **Rota no Expo Router:** `(private)/(tabs)/appointments`
- **View (`.view.tsx`):** `src/screens/appointments/appointments.view.tsx`
- **ViewModel (`use*ViewModel.ts`):** `src/screens/appointments/appointmentsViewModel.ts`
- **Schema (`.scheme.ts`):** `src/screens/appointments/appointmentScreen.scheme.ts`

---

## 🧩 Componentes Utilizados na Tela

### Componentes de UI:
- **`FormScrollContainer`**: Container responsivo de formulários.
- **`TextInputComponent`**: Campos para observações e notas.
- **`CustomSelectDropdown`**: Seleção de clientes, lembretes e repetição.
- **`TimeSelectDropdown`**: Seleção de horários de início.

### Modais Conectadas:
- **`SELECT_DATE_TIME`** (`ModalSelectDateTime`): Modal de seleção de data no calendário.
- **`CLIENT`** (`ModalNewClient`): Modal de cadastro rápido de novo cliente durante o agendamento.
- **`SERVICE`** (`ModalNewService`): Modal de seleção/cadastro de serviços.

---

## ⚖️ Regras de Negócio e Comportamentos da Tela

1. **Validação e Campos Obrigatórios (`appointmentScreen.scheme.ts`):**
   - Exige obrigatoriamente: `Cliente`, `Data`, `Hora de Início` e pelo menos 1 `Serviço`.
   - Permite campos opcionais: `Lembrete`, `Repetição` e `Observações/Notas`.

2. **Cálculo Automático de Duração e Término:**
   - O sistema calcula a soma das durações em minutos de todos os serviços selecionados.
   - O horário final (`endTime`) é calculado automaticamente somando a duração total ao horário inicial (`startTime`).
   - O valor total (`price`) é calculado somando o preço individual de cada serviço selecionado.

3. **Persistência do Agendamento:**
   - Salva o agendamento no estado global `useAppointmentStore` com o status inicial `'confirmed'`.
   - Reseta o formulário e redireciona para a Home (`/(private)/(tabs)/home`).

---

## 📜 Histórico de Atualizações
- **2026-08-23**: Mapeamento inicial da tela de agendamentos.
