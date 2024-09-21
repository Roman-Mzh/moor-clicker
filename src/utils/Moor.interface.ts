export type MoorCardType = {
  name: string;
  initialPrice: number;
  initialCpm: number;
};

export const cardsNames = ['Card1', 'Card2', 'Card3'] as const;

export type CardName = (typeof cardsNames)[number];
export const cards = {
  Card1: { name: 'Трактор', initialPrice: 100, initialCpm: 5 },
  Card2: { name: 'Камаз с песком', initialPrice: 80, initialCpm: 12 },
  Card3: { name: 'Дровосек', initialPrice: 120, initialCpm: 3 },
} as const satisfies Record<(typeof cardsNames)[number], MoorCardType>;

export type MoorEventType = {
  coinz: number;
  timestamp: number;
  cards: Record<CardName, number>;
  income: Record<CardName, number>;
  totalIncome: number;
};
