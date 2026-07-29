import React from 'react';
import useResetPasswordViewModel from '~/screens/resetPasswordView/resetPassword.viewModel';
import { ResetPasswordView } from '~/screens/resetPasswordView/resetPassword.view';

export default function ResetPasswordRoute() {
  const props = useResetPasswordViewModel();
  return <ResetPasswordView {...props} />;
}
