import { cards } from './constants/cards';
import { CPM_GROW_RATE, PRICE_GROW_RATE } from './constants/rates';
import { type CardName } from './interfaces/Moor.interface';

export const calcCard = (name: CardName, level: number) => {
  const { initialCpm, initialPrice } = cards[name];
  const totalCpm = level > 0 ? initialCpm * CPM_GROW_RATE ** (level - 1) : 0;
  const nextCpm = level > 0 ? initialCpm * CPM_GROW_RATE ** level : initialCpm;
  const nextPrice =
    level > 0 ? initialPrice * PRICE_GROW_RATE ** level : initialPrice;
  return { totalCpm, nextPrice, nextCpm };
};
