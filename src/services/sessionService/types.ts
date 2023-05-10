export type ErrorResponse = {
  error: string
}

export type SuccessfulLoginResponse = {
  userId: string
};

export type LoginResponse = ErrorResponse | SuccessfulLoginResponse;
