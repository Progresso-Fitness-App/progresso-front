
import type { IAPIResponse, BodyType } from "./types";

const doRequest = async <T>(method: string, location: URL | string, options: Partial<RequestInit>, body?: BodyType): Promise<IAPIResponse<T>> =>
  fetch(location.toString(), {
    method,
    ...options,
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    }
  }).then(async response => ({
    data: await response.json().catch(() => undefined) as T,
    statusCode: response.status,
    statusText: response.statusText
  }));

export const GET = async <T>(location: URL | string, options: Partial<RequestInit> = {}): Promise<IAPIResponse<T>> =>
  doRequest<T>('GET', location, options);

export const POST = async <T>(location: URL | string, body: BodyType, options: Partial<RequestInit> = {}): Promise<IAPIResponse<T>> =>
  doRequest<T>('POST', location, options, body);

export const PUT = async <T>(location: URL | string, body: BodyType, options: Partial<RequestInit> = {}): Promise<IAPIResponse<T>> =>
  doRequest<T>('PUT', location, options, body);

export const PATCH = async <T>(location: URL | string, body: BodyType, options: Partial<RequestInit> = {}): Promise<IAPIResponse<T>> =>
  doRequest<T>('PATCH', location, options, body);
