import { GET, PUT } from '@/base/api';
import { TStatGraph, TUserStat } from '@/types/stats';

interface IStatsService {
  get: (id: string, range: [Date, Date]) => Promise<TStatGraph[]>;
  push: (
    id: string,
    value: number,
    range: [Date, Date]
  ) => Promise<TStatGraph[]>;
  create: (name: string) => Promise<TUserStat[]>;
}

export const statsService: IStatsService = {
  get: (id, range: [Date, Date]) => {
    const [since, to] = range
      .map((date) => date.getTime())
      .sort((a, b) => a - b);

    const url = new URL(`/api/anubis/stats/${id}`, window.location.origin);
    url.searchParams.set('since', since.toString());
    url.searchParams.set('to', to.toString());

    return GET(url);
  },

  push: (id, value, range: [Date, Date]) => {
    const [since, to] = range
      .map((date) => date.getTime())
      .sort((a, b) => a - b);

    const url = new URL(`/api/anubis/stats/${id}`, window.location.origin);
    url.searchParams.set('since', since.toString());
    url.searchParams.set('to', to.toString());

    return PUT(url, { value });
  },

  create: (name) => PUT('/api/anubis/stats', { name }),
};
