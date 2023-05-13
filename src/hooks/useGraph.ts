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
}

export const useGraph = (stat: TUserStat): IGraphData => {
  const [graph, setGraph] = useState<TStatGraph[]>([]);
  const [status, setStatus] = useState<IRequestStatus>({ loading: false });

  useEffect(() => {
    let error: string;

    statsService
      .get(stat._id)
      .then(setGraph)
      .catch(({ message }) => (error = message))
      .finally(() => setStatus({ error, loading: false }));
  }, [stat._id]);

  const push = useCallback(
    (value: number) => {
      let error: string;
      statsService
        .push(stat._id, value)
        .then(setGraph)
        .catch(({ message }) => (error = message))
        .finally(() => setStatus({ error, loading: false }));
    },
    [stat._id]
  );

  return {
    graph,
    status,
    push,
  };
};
