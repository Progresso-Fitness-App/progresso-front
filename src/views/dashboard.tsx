import { Graph } from '@/components/graph';
import { Navbar } from '@/components/navbar';
import { SessionContext } from '@/contexts';
import { useContext } from 'react';

const DashboardView = (): JSX.Element => {
  const { session } = useContext(SessionContext);

  return (
    <>
      <div className="h-screen gap-4 bg-[url(./mesh-548.avif)] bg-cover flex items-center justify-center rounded-none">
        <Navbar />
        {session?.stats.map((stat) => (
          <Graph key={stat._id} stat={stat}></Graph>
        ))}
      </div>
    </>
  );
};

export default DashboardView;
