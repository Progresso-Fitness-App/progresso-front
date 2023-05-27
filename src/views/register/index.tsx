import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInputState } from '@mantine/hooks';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { IconEyeOff, IconEyeCheck } from '@tabler/icons-react';

import { sessionService } from '@/services';
import { SessionContext, ErrorContext } from '@/contexts';
import { DASHBOARD } from '@/constants/routes';
import { TSession } from '@/types/session';
import { RegisterViewWrapper } from './register.styled';

const RegisterView = (): JSX.Element => {
  const { setSession } = useContext(SessionContext);
  const { setError } = useContext(ErrorContext);

  const navigate = useNavigate();
  const [email, setEmail] = useInputState<string>('');
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
      .register(username, email, password)
      .then(handleSuccessfulLogin)
      .catch(setError);
  };

  return (
    <RegisterViewWrapper>
      <form onSubmit={handleSubmit}>
        <TextInput
          onChange={setEmail}
          label="E-mail"
          placeholder="E-mail"
          withAsterisk
        />

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
          Sign up
        </Button>
      </form>
    </RegisterViewWrapper>
  );
};

export default RegisterView;
