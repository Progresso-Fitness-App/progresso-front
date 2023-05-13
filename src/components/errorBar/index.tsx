import { APIError } from '@/types/error';

export const ErrorBar = (response: APIError): JSX.Element => {
  return (
    <p className="absolute inset-x-0 top-0 bg-red-500 p-2 text-white text-center font-medium">
      {response.error}
    </p>
  );
};
