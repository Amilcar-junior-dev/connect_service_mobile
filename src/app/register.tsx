
import useRegisterViewModel from "~/viewModels/registerViewModel/register.viewModel";
import {RegisterView} from "~/views/registerView/register.view";


export default function Register(){

    const props = useRegisterViewModel()
    
    return <RegisterView  {...props}/>
}