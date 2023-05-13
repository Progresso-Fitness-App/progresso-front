import type { TUserStat } from '@/types/stats';
import { useGraph } from '@/hooks/useGraph';
import {
  AreaChart,
  Button,
  DateRangePicker,
  DateRangePickerValue,
} from '@tremor/react';

export interface IGraph {
  stat: TUserStat;
}

export const Graph = ({ stat }: IGraph): JSX.Element => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59);

  const { push, graph, setRange } = useGraph(stat, [oneYearAgo, todayEnd]);

  const handleRangeChange = (event: DateRangePickerValue) => {
    const [from, to] = event;
    if (!from || !to) return;
    from.setHours(0, 0, 0);
    to.setHours(23, 59, 59);
    setRange([from, to]);
  };

  return (
    <div className="max-w-[400px] block p-2 flex flex-col gap-2">
      <AreaChart
        data={graph}
        index={stat.name}
        categories={[stat.name]}
        showAnimation
        curveType="natural"
      ></AreaChart>
      <DateRangePicker
        maxDate={todayEnd}
        minDate={oneYearAgo}
        onValueChange={handleRangeChange}
      ></DateRangePicker>
      <Button
        onClick={() => {
          push(Math.random() * 256);
        }}
      >
        ADD
      </Button>
    </div>
  );
};
