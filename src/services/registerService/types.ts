export type ErrorResponse = {
  error: string;
};

export type SuccessfulRegisterResponse = {
  message: string;
};

export type RegisterResponse = ErrorResponse | SuccessfulRegisterResponse;
