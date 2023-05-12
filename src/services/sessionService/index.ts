import type { IAPIResponse } from '@/base/api/types';
import type { SessionResponse } from './types';

import { GET, POST } from '@/base/api';

interface ISessionService {
  login: (
    username: string,
    password: string
  ) => Promise<IAPIResponse<SessionResponse>>;

  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<IAPIResponse<SessionResponse>>;

  getSession: () => Promise<IAPIResponse<SessionResponse>>;
}

export const sessionService: ISessionService = {
  login: (username, password) =>
    POST<SessionResponse>('/api/session/login', {
      username,
      password,
    }),

  register: (username, email, password) =>
    POST<SessionResponse>('/api/session/register', {
      username,
      email,
      password,
    }),

  getSession: () => GET<SessionResponse>('/api/session'),
};
