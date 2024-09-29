import { gameCards } from './constants/cards';
import { CPM_GROW_RATE, PRICE_GROW_RATE } from './constants/rates';
import { type CardName } from './interfaces/Moor.interface';

export const calcCard = (name: CardName, level: number) => {
  const { initialCpm, initialPrice } = gameCards[name];
  const nextCpm = level > 0 ? initialCpm * CPM_GROW_RATE ** level : initialCpm;
  const nextPrice =
    level > 0 ? initialPrice * PRICE_GROW_RATE ** level : initialPrice;
  return { nextPrice, nextCpm };
};

export const totalCpm = (name: CardName, level: number) => {
  return Array.from({ length: level }).reduce<number>((res, _, i) => {
    return res + calcCard(name, i).nextCpm;
  }, 0);
};
