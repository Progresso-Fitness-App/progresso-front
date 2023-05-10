import type { IAPIResponse } from '@/base/api/types';
import type { RegisterResponse } from './types';

import { POST } from '@/base/api';

interface IRegisterService {
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<IAPIResponse<RegisterResponse>>;
}

export const registerService: IRegisterService = {
  register: (username, email, password) =>
    POST<RegisterResponse>('/api/register', {
      username,
      email,
      password,
    }),
};
