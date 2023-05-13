import { Graph } from '@/components/graph';
import { SessionContext } from '@/contexts';
import { useContext } from 'react';
import { sessionService } from '@/services';

const DashboardView = (): JSX.Element => {
  const { session, setSession } = useContext(SessionContext);

  const handleLogout = async () => {
    await sessionService.logout().catch(() => null);

    setSession(undefined);
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        {session?.stats.map((stat) => (
          <Graph key={stat._id} stat={stat}></Graph>
        ))}
      </div>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default DashboardView;
