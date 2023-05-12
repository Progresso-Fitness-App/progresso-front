export type APIErrorResponse = {
  error: string;
};

export type WithAPIError<T> = T | APIErrorResponse;
