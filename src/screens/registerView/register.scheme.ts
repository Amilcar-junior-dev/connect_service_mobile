import * as yup from 'yup';

export const registerScheme = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório'),
  phone: yup
    .string()
    .required('Telefone é obrigatório'),
  email: yup
    .string()
    .email()
    .required('Email é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirm_password: yup
    .string()
    .required('Senha é obrigatória')
    .oneOf([yup.ref('password')], 'Senhas diferentes'),
});

export type RegisterFormData = yup.InferType<typeof registerScheme>;

