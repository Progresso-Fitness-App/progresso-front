export type TUserStat = {
  _id: string;
  name: string;
};

export type TStatGraph = {
  [key: string]: number;
} & { date: string };
