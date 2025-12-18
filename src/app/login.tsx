
import useLoginViewModel from "~/viewModels/loginViewModel/login.viewModel";
import {LoginView} from "~/views/loginView/login.view";


export default function Login(){

    const props = useLoginViewModel()
    
    return <LoginView  {...props}/>
}