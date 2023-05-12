import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { SessionResponse, sessionService } from '@/services';
import { Loader } from '@/components/fullScreenLoader';

export interface ISessionContext {
  session?: SessionResponse;
  isLoading: boolean;
  setSession: Dispatch<SetStateAction<SessionResponse | undefined>>;
  refresh: () => Promise<void>;
}

export interface ISessionProvider {
  children: JSX.Element;
}

export const SessionContext = createContext<ISessionContext>({
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSession: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refresh: async () => {},
});

const childrenAnimations = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerDirection: -1,
    },
  },
};

const loadingAnimations = {
  shown: { opacity: 1 },
  hide: {
    opacity: 0,
    transition: {
      delayChildren: 0.5,
      staggerDirection: 1,
    },
  },
};

export const SessionProvider = ({ children }: ISessionProvider) => {
  const [session, setSession] = useState<SessionResponse | undefined>();
  const [isLoading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const res = await sessionService.getSession();
      if (!res.data || 'error' in res.data) {
        setSession(undefined);
        return;
      }

      setSession(res.data);
    } catch (e) {
      setSession(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <SessionContext.Provider
      value={{
        isLoading,
        session,
        setSession,
        refresh,
      }}
    >
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            variants={loadingAnimations}
            initial="shown"
            animate="hide"
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            variants={childrenAnimations}
            initial="hidden"
            animate="show"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </SessionContext.Provider>
  );
};
