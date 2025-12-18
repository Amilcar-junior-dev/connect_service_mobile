import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFormData, registerScheme } from './register.scheme';
import { yupResolver } from '@hookform/resolvers/yup';
export default function useRegisterViewModel (){

    const [inputRegister, setInputRegister] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: '',
    })

     const {
            control,
            handleSubmit,
            watch,
            clearErrors,
            formState:{ errors }
        } = useForm<RegisterFormData>({
            resolver: yupResolver(registerScheme),
            defaultValues: {
                email: '',
                password: ''
            }
        })
    
        const onSubmit = handleSubmit((loginData)=> {
            console.log("🚀 ~ login.viewModel.ts:26 ~ useLoginViewModel ~ loginData:", loginData)
          
            // Adicionar chamada de endpoint aqui
        })
    


    return {
        inputRegister,
        setInputRegister,
        control,
        errors,
        clearErrors,
        onSubmit
    }
}