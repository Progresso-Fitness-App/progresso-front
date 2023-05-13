import { GET, POST, DELETE } from '@/base/api';
import { TSession } from '@/types/session';

interface ISessionService {
  login: (username: string, password: string) => Promise<TSession>;

  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<TSession>;

  getSession: () => Promise<TSession>;

  logout: () => Promise<Record<string, never>>;
}

export const sessionService: ISessionService = {
  login: (username, password) =>
    POST('/api/session/login', {
      username,
      password,
    }),

  register: (username, email, password) =>
    POST('/api/session/register', {
      username,
      email,
      password,
    }),

  getSession: () => GET('/api/session'),

  logout: () => DELETE('/api/session'),
};
