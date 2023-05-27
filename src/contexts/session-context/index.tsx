import type { TSession } from '@/types/session';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { sessionService } from '@/services';
import { LoadingOverlay } from '@mantine/core';

export interface ISessionContext {
  session?: TSession;
  isLoading: boolean;
  setSession: Dispatch<SetStateAction<TSession | undefined>>;
  refresh: () => Promise<void>;
}

export interface ISessionProvider {
  children: ReactNode;
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
  const [session, setSession] = useState<TSession | undefined>();
  const [isLoading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);

    sessionService
      .getSession()
      .then(setSession)
      .catch(() => setSession(undefined))
      .finally(() => setLoading(false));
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
            <LoadingOverlay visible />
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
