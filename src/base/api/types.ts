
export type BodyType = string | number | object;

export interface IAPIResponse<T> {
  data?: T,
  statusCode: number,
  statusText: string
}
