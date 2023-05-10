import { ChangeEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerService } from '@/services';

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

    registerService
      .register(username, email, password)
      .then(({ statusCode, statusText, data }) => {
        if (data) {
          'message' in data ? setError(data.message) : navigate('/dashboard');
        } else {
          setError(`${statusCode}: ${statusText}`);
        }
      })
      .catch((e) => setError(e.message));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {error && (
        <p className="absolute inset-x-0 top-0 bg-red-500 p-2">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          className="border"
          onChange={handleUsernameChange}
        />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          className="border"
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          className="border"
          type="password"
          onChange={handlePasswordChange}
          name="password"
        />
        <button
          className="border enabled:bg-gray-100"
          type="submit"
          disabled={!isFormEnabled}
        >
          Register
        </button>
      </form>
    </div>
  );
};
