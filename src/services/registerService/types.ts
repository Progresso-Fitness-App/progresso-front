export type ErrorResponse = {
  error: string;
};

export type SuccessfulRegisterResponse = {
  userId: string;
};

export type RegisterResponse = ErrorResponse | SuccessfulRegisterResponse;
