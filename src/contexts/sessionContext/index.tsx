import { createContext, useCallback, useEffect, useState } from 'react';
import { SuccessfulUserDataResponse, sessionService } from '@/services';

export interface ISessionContext {
  data?: SuccessfulUserDataResponse;
  refresh: () => Promise<void>;
}

export interface ISessionProvider {
  children: JSX.Element;
}

export const SessionContext = createContext<ISessionContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refresh: async () => {},
});

export const SessionProvider = ({ children }: ISessionProvider) => {
  const [data, setData] = useState<SuccessfulUserDataResponse | undefined>();

  const refresh = useCallback(async () => {
    try {
      const res = await sessionService.getUserData();
      if (!res.data || 'error' in res.data) {
        setData(undefined);
        return;
      }

      setData(res.data);
    } catch (e) {
      setData(undefined);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <SessionContext.Provider
      value={{
        refresh,
        data,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
