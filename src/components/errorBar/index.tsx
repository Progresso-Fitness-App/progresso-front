import { ReactNode } from 'react';

export const ErrorBar = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return (
    <p className="absolute inset-x-0 top-0 bg-red-500 p-2 text-white text-center font-medium">
      {children}
    </p>
  );
};
