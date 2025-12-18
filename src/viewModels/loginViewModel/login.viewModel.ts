import { yupResolver } from '@hookform/resolvers/yup';
import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormData, loginScheme } from './login.scheme';
import { router } from 'expo-router';
export default function useLoginViewModel (){

    const [inputLogin, setInputlogin] = useState({
        email: '',
        password: '',
    })

    const {
        control,
        handleSubmit,
        watch,
        clearErrors,
        formState:{ errors }
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginScheme),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = handleSubmit(async(loginData)=> {
        console.log("🚀 ~ login.viewModel.ts:26 ~ useLoginViewModel ~ loginData:", loginData)
        const {email, password} = loginData
        router.push('/(private)/home')
        
        // Adicionar chamada de endpoint aqui
    })

    return {
        inputLogin,
        setInputlogin,
        errors,
        onSubmit,
        clearErrors,
        control
    }
}