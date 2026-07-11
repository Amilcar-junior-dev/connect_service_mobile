import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Employee } from '~/models/employee.model';
import { mmkvStorage } from './mmkvStorage';

interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  clearEmployees: () => void;
}

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set) => ({
      employees: [],
      addEmployee: (employee) =>
        set((state) => ({
          employees: [
            ...state.employees,
            {
              ...employee,
              id: String(Date.now()), // Gera ID único temporário
            },
          ],
        })),
      clearEmployees: () => set({ employees: [] }),
    }),
    {
      name: 'employee-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
