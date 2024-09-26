import type { CardName, MoorCardType } from '../interfaces/Moor.interface';

export const cards: Record<CardName, MoorCardType> = {
  Card1: {
    id: 'Card1',
    title: 'Трактор',
    initialPrice: 100,
    initialCpm: 5,
    pic: 'trtr',
  },
  Card2: {
    id: 'Card2',
    title: 'Песок',
    initialPrice: 80,
    initialCpm: 3,
    pic: 'sand',
  },
  Card3: {
    id: 'Card3',
    title: 'Дачнег',
    initialPrice: 120,
    initialCpm: 1,
    pic: 'drovosek',
  },
  Card4: {
    id: 'Card4',
    title: 'Сваи',
    initialPrice: 320,
    initialCpm: 14,
    pic: 'svai',
  },
  Card5: {
    id: 'Card5',
    title: 'Бытовка',
    initialPrice: 100,
    initialCpm: 1,
    pic: 'byt',
  },
  Card6: {
    id: 'Card6',
    title: 'Дрова',
    initialPrice: 20,
    initialCpm: 1,
    pic: 'drova',
  },
};
