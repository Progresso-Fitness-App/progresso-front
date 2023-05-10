import type { IAPIResponse } from '@/base/api/types';
import type { LoginResponse, RegisterResponse } from './types';

import { POST } from '@/base/api';

interface ISessionService {
  login: (
    username: string,
    password: string
  ) => Promise<IAPIResponse<LoginResponse>>;

  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<IAPIResponse<RegisterResponse>>;
}

export const sessionService: ISessionService = {
  login: (username, password) =>
    POST<LoginResponse>('/api/login', {
      username,
      password,
    }),

  register: (username, email, password) =>
    POST<RegisterResponse>('/api/register', {
      username,
      email,
      password,
    }),
};