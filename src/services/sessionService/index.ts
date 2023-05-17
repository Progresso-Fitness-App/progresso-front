import { GET, POST } from '@/base/api';
import { TSession } from '@/types/session';

interface ISessionService {
  login: (username: string, password: string) => Promise<TSession>;

  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<TSession>;

  getSession: () => Promise<TSession>;
}

export const sessionService: ISessionService = {
  login: (username, password) =>
    POST<TSession>('/api/session/login', {
      username,
      password,
    }),

  register: (username, email, password) =>
    POST<TSession>('/api/session/register', {
      username,
      email,
      password,
    }),

  getSession: () => GET<TSession>('/api/session'),
};
