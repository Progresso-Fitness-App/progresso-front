import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBar } from '@/components/errorBar';

export interface ISessionContext {
  error?: string;
  setError: <T extends Error & { message: string }>(error: string | T) => void;
}

export const ErrorContext = createContext<ISessionContext>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setError: () => {},
});

export interface ISessionProvider {
  children: ReactNode;
}

export const ErrorProvider = ({ children }: ISessionProvider) => {
  const [error, setError] = useState<string | undefined>();

  const errorTimeout = useRef<ReturnType<typeof setTimeout> | undefined>();

  const setErrorTimeout = useCallback(
    <T extends Error & { message: string }>(error: string | T) => {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(error);
      }
      errorTimeout.current = setTimeout(() => {
        setError(undefined);
      }, 5000);
    },
    []
  );

  useEffect(() => {
    return () => clearTimeout(errorTimeout.current);
  }, []);

  return (
    <ErrorContext.Provider
      value={{
        error,
        setError: setErrorTimeout,
      }}
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ErrorBar>{error}</ErrorBar>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </ErrorContext.Provider>
  );
};
