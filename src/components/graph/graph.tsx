import { useGraph } from '@/hooks/useGraph';
import { TUserStat } from '@/types/stats';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export interface IGraph {
  stat: TUserStat;
}

export const Graph = ({ stat }: IGraph) => {
  const { graph } = useGraph(stat, [new Date(0), new Date()]);

  return (
    <ResponsiveContainer>
      <LineChart data={graph}>
        <Line
          animationBegin={100}
          type="monotone"
          dataKey={stat.name}
          stroke="#c0c0c0"
        />
        <XAxis fontSize={12} axisLine={false} dataKey={'date'} />
        <YAxis fontSize={12} axisLine={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
