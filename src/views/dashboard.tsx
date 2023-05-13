import { Graph } from '@/components/graph';
import { SessionContext } from '@/contexts';
import { useContext } from 'react';

const DashboardView = (): JSX.Element => {
  const { session } = useContext(SessionContext);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        {session?.stats.map((stat) => (
          <Graph key={stat._id} stat={stat}></Graph>
        ))}
      </div>
    </>
  );
};

export default DashboardView;
