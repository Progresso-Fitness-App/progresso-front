import { ChangeEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionService } from "@/services";

export const LoginView = (): JSX.Element => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const isFormEnabled = useMemo(() =>
    username.length > 0 && password.length > 0,
    [username, password]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormEnabled) return;

    sessionService.login(username, password).then(({ statusCode, statusText, data }) => {
      if (data) {
        'error' in data
          ? setError(data.error)
          : navigate('/dashboard')
      } else {
        setError(`${statusCode}: ${statusText}`);
      }
    }).catch(e => setError(e.message));
  }


  return <div className="h-screen flex items-center justify-center">
    {error && <p className="absolute inset-x-0 top-0 bg-red-500 p-2">{error}</p>}

    <form onSubmit={handleSubmit}>
      <input className="border" onChange={handleUsernameChange} />
      <input className="border" type="password" onChange={handlePasswordChange} />
      <button className="border enabled:bg-gray-100" type="submit" disabled={!isFormEnabled}>Submit</button>
    </form>
  </div>
};
