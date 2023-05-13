import { GET, PUT } from '@/base/api';
import { TStatGraph, TUserStat } from '@/types/stats';

interface IStatsService {
  get: (id: string) => Promise<TStatGraph[]>;
  push: (id: string, value: number) => Promise<TStatGraph[]>;
  create: (name: string) => Promise<TUserStat[]>;
}

export const statsService: IStatsService = {
  get: (id) => GET(`/api/anubis/stats/${id}`),
  push: (id, value) => PUT(`/api/anubis/stats/${id}`, { value }),
  create: (name) => PUT('/api/anubis/stats', { name }),
};
