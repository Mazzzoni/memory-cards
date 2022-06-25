import { Cards } from './Cards';

export type CardStateDefinition = {
  card: Cards | null;
  owner: string | null;
};