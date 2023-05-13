import type { TUserStat } from '@/types/stats';
import { useGraph } from '@/hooks/useGraph';
import { AreaChart } from '@tremor/react';

export interface IGraph {
  stat: TUserStat;
}

export const Graph = ({ stat }: IGraph): JSX.Element => {
  const { push, graph } = useGraph(stat);

  return (
    <div className="w-full block">
      <AreaChart
        data={graph}
        index={stat.name}
        categories={[stat.name]}
      ></AreaChart>
      <button
        onClick={() => {
          push(Math.random() * 256);
        }}
      >
        ADD shit
      </button>
    </div>
  );
};
