import { Graph } from '@/components/graph/graph';
import { DASHBOARD } from '@/constants/routes';
import { SessionContext } from '@/contexts';
import {
  ActionIcon,
  AppShell,
  Card,
  Flex,
  Group,
  Header,
  Menu,
} from '@mantine/core';
import {
  IconFlame,
  IconMessageCircle,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const DashboardView = (): JSX.Element => {
  const { session } = useContext(SessionContext);

  return (
    <AppShell
      padding={'md'}
      header={
        <Header height={60} p="md">
          <Flex align="center" gap={'sm'}>
            <Link to={`/${DASHBOARD}`}>
              <ActionIcon
                role="link"
                aria-label="Go to dashboard"
                variant="transparent"
              >
                <IconFlame size={24} />
              </ActionIcon>
            </Link>

            <Flex align="center" justify={'center'} gap={'sm'} w={'100%'}>
              whatever here
            </Flex>

            <Menu shadow="md">
              <Menu.Target>
                <ActionIcon>
                  <IconUser size={24} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>
                <Menu.Item icon={<IconMessageCircle size={14} />}>
                  Messages
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Header>
      }
    >
      <Group align="center" position="center">
        {session?.stats.map((stat) => (
          <Card w={'400px'} h={'400px'} key={stat._id}>
            <Graph stat={stat} />
          </Card>
        ))}
      </Group>
    </AppShell>
  );
};

export default DashboardView;
