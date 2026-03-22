
import useLoginViewModel from "~/screens/loginView/useLoginViewModel";
import {LoginView} from "~/screens/loginView/login.view";


export default function Login(){

    const props = useLoginViewModel()
    
    return <LoginView  {...props}/>
}