import { WithError } from '@/types/error';
import { UserStat } from '@/types/stats';

export type ErrorResponse = {
  error: string;
};

export type SessionResponse = WithError<{
  username: string;
  email: string;
  hash: string;
  timestamp: number;
  stats: UserStat[];
  _id: string;
}>;
