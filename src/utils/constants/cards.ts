import type { CardName, MoorCardType } from '../interfaces/Moor.interface';

export const cards: Record<CardName, MoorCardType> = {
  Card1: { name: 'Трактор', initialPrice: 100, initialCpm: 5, pic: 'trtr' },
  Card2: { name: 'Песок', initialPrice: 80, initialCpm: 3, pic: 'sand' },
  Card3: {
    name: 'Дачнег',
    initialPrice: 120,
    initialCpm: 1,
    pic: 'drovosek',
  },
  Card4: { name: 'Сваи', initialPrice: 320, initialCpm: 14, pic: 'svai' },
  Card5: { name: 'Бытовка', initialPrice: 100, initialCpm: 1, pic: 'byt' },
  Card6: { name: 'Дрова', initialPrice: 20, initialCpm: 1, pic: 'drova' },
};
