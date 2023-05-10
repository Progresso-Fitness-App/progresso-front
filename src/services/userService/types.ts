export type ErrorResponse = {
  error: string
}

export type SuccessfulStatsResponse = {
  data: string
};

export type WeightResponse = ErrorResponse | SuccessfulStatsResponse;

export type BodyFatResponse = ErrorResponse | SuccessfulStatsResponse;
