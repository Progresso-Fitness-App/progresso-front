import type { IAPIResponse } from '@/base/api/types';
import type {
  LoginResponse,
  RegisterResponse,
  UserDataResponse,
} from './types';

import { GET, POST } from '@/base/api';

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

  getUserData: () => Promise<IAPIResponse<UserDataResponse>>;
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

  getUserData: () => GET<UserDataResponse>('/api/me'),
};
