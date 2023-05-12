export type APIError = {
  error: string;
};

export type WithError<T> = T | APIError;
