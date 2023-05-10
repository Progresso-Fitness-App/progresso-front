import { WithAPIError } from '@/types/APIError';

export type SuccessfulLoginResponse = {
  userId: string;
};

export type SuccessfulRegisterResponse = {
  message: string;
};

export type UserChartData = {
  date: string;
  value: number;
};

export type SuccessfulUserDataResponse = {
  charts: {
    weight: UserChartData[];
    bodyFat: UserChartData[];
  };
  averages: {
    weight: number;
    bodyFat: number;
  };
};

export type LoginResponse = WithAPIError<SuccessfulLoginResponse>;
export type RegisterResponse = WithAPIError<SuccessfulRegisterResponse>;
export type UserDataResponse = WithAPIError<SuccessfulUserDataResponse>;
