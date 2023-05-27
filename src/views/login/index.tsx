import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInputState } from '@mantine/hooks';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { IconEyeOff, IconEyeCheck } from '@tabler/icons-react';

import { sessionService } from '@/services';
import { SessionContext, ErrorContext } from '@/contexts';
import { DASHBOARD } from '@/constants/routes';
import { TSession } from '@/types/session';
import { LoginViewWrapper } from './login.styled';

const LoginView = (): JSX.Element => {
  const { setSession } = useContext(SessionContext);
  const { setError } = useContext(ErrorContext);

  const navigate = useNavigate();
  const [username, setUsername] = useInputState<string>('');
  const [password, setPassword] = useInputState<string>('');

  const isFormEnabled = useMemo(
    () => username.length > 0 && password.length > 0,
    [username, password]
  );

  const handleSuccessfulLogin = (data: TSession) => {
    setSession(data);
    navigate(`/${DASHBOARD}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormEnabled) return;

    sessionService
      .login(username, password)
      .then(handleSuccessfulLogin)
      .catch(setError);
  };

  return (
    <LoginViewWrapper>
      <form onSubmit={handleSubmit}>
        <TextInput
          onChange={setUsername}
          label="Username"
          placeholder="Username"
          withAsterisk
        />
        <PasswordInput
          onChange={setPassword}
          label="Password"
          placeholder="Password"
          withAsterisk
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
          }
        />

        <Button type="submit" mt={'sm'} variant="outline" fullWidth>
          Sign in
        </Button>
      </form>
    </LoginViewWrapper>
  );
};

export default LoginView;
