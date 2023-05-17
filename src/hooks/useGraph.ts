import { statsService } from '@/services/statsService';
import { TStatGraph, TUserStat } from '@/types/stats';
import { useCallback, useEffect, useState } from 'react';

export interface IRequestStatus {
  loading: boolean;
  error?: string;
}

export interface IGraphData {
  graph: TStatGraph[];
  status: IRequestStatus;
  push: (value: number) => void;
  setRange: (range: [Date, Date]) => void;
}

export const useGraph = (
  stat: TUserStat,
  defaultRange: [Date, Date]
): IGraphData => {
  const [graph, setGraph] = useState<TStatGraph[]>([]);
  const [range, setRange] = useState<[Date, Date]>(defaultRange);
  const [status, setStatus] = useState<IRequestStatus>({ loading: false });

  useEffect(() => {
    let error: string;

    statsService
      .get(stat._id, range)
      .then(setGraph)
      .catch(({ message }) => (error = message))
      .finally(() => setStatus({ error, loading: false }));
  }, [stat._id, range]);

  const push = useCallback(
    (value: number) => {
      let error: string;
      statsService
        .push(stat._id, value, range)
        .then(setGraph)
        .catch(({ message }) => (error = message))
        .finally(() => setStatus({ error, loading: false }));
    },
    [stat._id, range]
  );

  return {
    graph,
    status,
    push,
    setRange,
  };
};
