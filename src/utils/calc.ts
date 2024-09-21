import { type CardName, cards } from './Moor.interface';

export const calcCard = (name: CardName, level: number) => {
  const { initialCpm, initialPrice } = cards[name];
  const totalCpm = level > 0 ? initialCpm * 1.3 ** (level - 1) : 0;
  const nextCpm = level > 0 ? initialCpm * 1.3 ** level : initialCpm;
  const nextPrice = level > 0 ? initialPrice * 1.5 ** level : initialPrice;
  return { totalCpm, nextPrice, nextCpm };
};
