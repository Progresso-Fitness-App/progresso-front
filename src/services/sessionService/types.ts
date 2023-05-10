export type ErrorResponse = {
  error: string;
};

export type SuccessfulLoginResponse = {
  userId: string;
};

export type SuccessfulRegisterResponse = {
  message: string;
};

export type LoginResponse = ErrorResponse | SuccessfulLoginResponse;
export type RegisterResponse = ErrorResponse | SuccessfulRegisterResponse;
