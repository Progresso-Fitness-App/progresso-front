import { ErrorBarStyled } from './error-bar.styled';
import { ActionIcon, Text } from '@mantine/core';
import { IconAlertTriangleFilled, IconX } from '@tabler/icons-react';

export interface IErrorBar {
  errorMessage: string;
  onClose: () => void;
}

export const ErrorBar = ({ errorMessage, onClose }: IErrorBar): JSX.Element => {
  return (
    <ErrorBarStyled aria-live="assertive" spacing={'sm'}>
      <IconAlertTriangleFilled size={16} />
      <Text>{errorMessage}</Text>
      <ActionIcon
        aria-label="Close error bar"
        variant="light"
        ml={'auto'}
        onClick={onClose}
      >
        <IconX size={16} />
      </ActionIcon>
    </ErrorBarStyled>
  );
};
