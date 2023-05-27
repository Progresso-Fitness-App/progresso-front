import { ReactNode, useContext, useEffect } from 'react';
import { SessionContext } from '@/contexts';
import { useNavigate } from 'react-router-dom';

interface ISessionProtectedRoute {
  children: ReactNode;
  fallbackURL: string;
}

export const SessionProtectedRoute = ({
  fallbackURL,
  children,
}: ISessionProtectedRoute): JSX.Element => {
  const { session, isLoading } = useContext(SessionContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || session) return;
    navigate(fallbackURL);
  }, [session, isLoading, fallbackURL, navigate]);

  return <>{session && children}</>;
};
