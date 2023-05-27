import styled from '@emotion/styled';
import { DEFAULT_THEME, Group } from '@mantine/core';

export const ErrorBarStyled = styled(Group)`
  position: fixed;
  top: 0;
  inset-inline: 0;
  background-color: ${DEFAULT_THEME.colors.red[6]};
  color: ${DEFAULT_THEME.colors.gray[0]};
  padding: ${DEFAULT_THEME.spacing.sm};
`;
