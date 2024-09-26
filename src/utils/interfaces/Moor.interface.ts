export type MoorCardType = {
  id: CardName;
  title: string;
  initialPrice: number;
  initialCpm: number;
  pic: string;
};

export const cardsNames = [
  'Card1',
  'Card2',
  'Card3',
  'Card4',
  'Card5',
  'Card6',
] as const;

export type CardName = (typeof cardsNames)[number];

export type MoorEventType = {
  coinz: number;
  timestamp: number;
  cards: Record<CardName, number>;
  income: Record<CardName, number>;
  totalIncome: number;
};

export type GameState = {
  lastEvent: MoorEventType;
  realCoinz: number;
};
