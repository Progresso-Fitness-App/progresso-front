import { ChangeEvent, useId, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sessionService } from '@/services';
import { TextInput, Button } from '@tremor/react';


export const RegisterView = (): JSX.Element => {
  const navigate = useNavigate();

  //define variables
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  //disable button if fields don't have text
  const isFormEnabled = useMemo(
    () => username.length > 0 && password.length > 0 && email.length > 0,
    [username, password, email]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormEnabled) return;

    sessionService
      .register(username, email, password)
      .then(({ statusCode, statusText, data }) => {
        if (data) {
          'error' in data ? setError(data.error) : navigate('/dashboard');
        } else {
          setError(`${statusCode}: ${statusText}`);
        }
      })
      .catch((e) => setError(e.message));
  };

  const usernameId = useId(),
    passwordId = useId(),
    emailId = useId();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {error && (
        <p className="absolute inset-x-0 top-0 bg-red-500 p-2">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <label className='text-sm text-gray-700' htmlFor={usernameId}>Username</label>
        <TextInput
          id={usernameId}
          name="username"
          placeholder="Username..."
          onChange={handleUsernameChange}
        />
        <label className='text-sm text-gray-700' htmlFor={emailId}>Email</label>
        <TextInput
          id={emailId}
          name="email"
          placeholder="Email..."
          onChange={handleEmailChange}
        />
        <label className='text-sm text-gray-700' htmlFor={passwordId}>Password</label>
        <TextInput
          id={passwordId}
          type="password"
          name="password"
          placeholder="Password..."
          onChange={handlePasswordChange}
        />
        <Button
          className="mt-2"
          type="submit"
          disabled={!isFormEnabled}
        >
          Register
        </Button>
      </form>
    </div>
  );
};
