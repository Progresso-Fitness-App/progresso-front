import { TUserStat } from './stats';

export type TSession = {
  username: string;
  email: string;
  hash: string;
  timestamp: number;
  stats: TUserStat[];
  _id: string;
};
