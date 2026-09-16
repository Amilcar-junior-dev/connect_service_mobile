# Regras de Negócio: Agendamentos (`Appointments`)

## 1. Seleção de Data e Hora
- O cliente visualiza a agenda em formato de calendário mensal e lista de horários disponíveis.
- Não é permitido agendar serviços em datas ou horários passados.
- Um agendamento exige obrigatoriamente: `Cliente`, `Serviço`, `Colaborador` e `Data/Hora`.

## 2. Status do Agendamento
- Os agendamentos possuem os status:
  - `PENDING` (Pendente de confirmação)
  - `CONFIRMED` (Confirmado)
  - `COMPLETED` (Concluído)
  - `CANCELLED` (Cancelado)

## 3. Cancelamento
- Apenas o cliente proprietário do agendamento ou o administrador do salão podem cancelar a reserva.
