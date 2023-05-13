import type { BodyType, APIErrorResponse } from './types';

const doRequest = async <T extends object>(
  method: string,
  location: URL | string,
  options: Partial<RequestInit>,
  body?: BodyType
): Promise<T> => {
  const res = await fetch(location.toString(), {
    method,
    ...options,
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  try {
    const data = (await res.json()) as T | APIErrorResponse;

    if ('error' in data) {
      throw new Error(data.error);
    }

    return data;
  } catch {
    throw new Error(res.statusText);
  }
};

export const GET = async <T extends object>(
  location: URL | string,
  options: Partial<RequestInit> = {}
): Promise<T> => doRequest<T>('GET', location, options);

export const DELETE = async <T extends object>(
  location: URL | string,
  options: Partial<RequestInit> = {}
): Promise<T> => doRequest<T>('DELETE', location, options);

export const POST = async <T extends object>(
  location: URL | string,
  body: BodyType,
  options: Partial<RequestInit> = {}
): Promise<T> => doRequest<T>('POST', location, options, body);

export const PUT = async <T extends object>(
  location: URL | string,
  body: BodyType,
  options: Partial<RequestInit> = {}
): Promise<T> => doRequest<T>('PUT', location, options, body);

export const PATCH = async <T extends object>(
  location: URL | string,
  body: BodyType,
  options: Partial<RequestInit> = {}
): Promise<T> => doRequest<T>('PATCH', location, options, body);
