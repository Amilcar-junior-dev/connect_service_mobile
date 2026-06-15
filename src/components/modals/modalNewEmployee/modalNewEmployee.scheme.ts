import { UseFormReturn } from 'react-hook-form';
import { EmployeeFormType } from './modalNewEmployee.schema';

export interface NewEmployeeModalProps {
  data?: Record<string, unknown> | null;
}

export interface NewEmployeeFormProps {
  methods: UseFormReturn<EmployeeFormType>;
}
