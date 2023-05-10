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
  const { data } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    data || navigate(fallbackURL);
  }, [data, fallbackURL, navigate]);

  return <>{data && children}</>;
};
