import useRegisterViewModel from '~/screens/registerView/useRegisterViewModel';
import { RegisterView } from '~/screens/registerView/register.view';

export default function Register() {
  const props = useRegisterViewModel();

  return <RegisterView {...props} />;
}
