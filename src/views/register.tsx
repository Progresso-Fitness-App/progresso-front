import {
  ChangeEvent,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionResponse, sessionService } from '@/services';
import { SessionContext } from '@/contexts';
import { DASHBOARD } from '@/constants/routes';

const RegisterView = (): JSX.Element => {
  const { session, setSession } = useContext(SessionContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    session && navigate(`/${DASHBOARD}`);
  }, [session, navigate]);

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

  const handleSuccessfulRegister = (data: SessionResponse) => {
    setSession(data);
    navigate(`/${DASHBOARD}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormEnabled) return;

    sessionService
      .register(username, email, password)
      .then(({ statusCode, statusText, data }) => {
        if (data) {
          'error' in data
            ? setError(data.error)
            : handleSuccessfulRegister(data);
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
    <div className="h-screen flex items-center justify-center bg-[url(./mesh-548.png)] bg-cover">
      {error && (
        <p className="absolute inset-x-0 top-0 bg-red-500 p-2">{error}</p>
      )}

      <div className="mt-7 bg w-96 px-2">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-3xl font-bold text-white">Sign up</h1>
            <p className="mt-2 text-sm text-gray-300">
              Already have an account?{' '}
              <a
                className="text-white decoration-2 hover:underline font-medium"
                href="/login"
              >
                Sign in here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm 0"
            >
              <svg
                className="w-4 h-auto"
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
              >
                <path
                  d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                  fill="#34A853"
                />
                <path
                  d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                  fill="#FBBC05"
                />
                <path
                  d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                  fill="#EB4335"
                />
              </svg>
              Sign in with Google
            </button>

            <div className="py-3 flex items-center text-xs text-white uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 ">
              Or
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor={usernameId}
                    className="block text-sm mb-2 text-white"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id={usernameId}
                      className="py-1 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                      onChange={handleUsernameChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={emailId}
                    className="block text-sm mb-2 text-white"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id={emailId}
                      className="py-1 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={passwordId}
                    className="block text-sm mb-2 text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id={passwordId}
                      className="py-1 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="accept-terms"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3">
                    <label
                      htmlFor="accept-terms"
                      className="text-sm dark:text-white"
                    >
                      I accept the Terms and Conditions
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm backdrop-blur-sm"
                  disabled={!isFormEnabled}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
