import { SessionContext } from '@/contexts';
import { AppShell } from '@mantine/core';
import { useContext } from 'react';

const DashboardView = (): JSX.Element => {
  const { session } = useContext(SessionContext);

  return <AppShell>a</AppShell>;
};

export default DashboardView;
