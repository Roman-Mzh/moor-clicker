import { calcCard } from './calc';
import {
  type CardName,
  cardsNames,
  type MoorEventType,
} from './Moor.interface';

export const moorGame = () => {
  const initialEvent: MoorEventType = {
    coinz: 0,
    timestamp: Date.now(),
    cards: { Card1: 0, Card2: 0, Card3: 0 },
    income: { Card1: 0, Card2: 0, Card3: 0 },
    totalIncome: 0,
  };
  const events: MoorEventType[] = [];
  const start = () => {
    events.push(initialEvent);
  };

  const getState = () => {
    const lastEvent = events.at(-1);
    if (!lastEvent) throw new Error('could not start game');
    const now = Date.now();

    const realCoinz =
      lastEvent.coinz +
      ((now - lastEvent.timestamp) / 1000) * lastEvent.totalIncome;
    return { lastEvent, realCoinz };
  };

  const click = () => {
    const { lastEvent, realCoinz } = getState();
    const nextEvent = {
      ...lastEvent,
      coinz: Math.max(realCoinz, lastEvent.coinz) + 10,
      timestamp: Date.now(),
    };
    events.push(nextEvent);

    return nextEvent;
  };

  const upCard = (name: CardName) => {
    const { lastEvent, realCoinz } = getState();
    const { nextPrice, nextCpm } = calcCard(name, lastEvent.cards[name]);
    if (nextPrice > Math.max(realCoinz, lastEvent.coinz))
      throw new Error('not enough coinz');

    const nextEvent = {
      ...lastEvent,
      cards: { ...lastEvent.cards, [name]: (lastEvent.cards[name] += 1) },
      coinz: Math.max(realCoinz, lastEvent.coinz) - nextPrice,
      timestamp: Date.now(),
    };
    nextEvent.income = {
      ...nextEvent.income,
      [name]: nextEvent.income[name] + nextCpm,
    };
    nextEvent.totalIncome = cardsNames.reduce(
      (res, name) => (res += nextEvent.income[name]),
      0,
    );
    events.push(nextEvent);

    return nextEvent;
  };

  start();
  return { getState, click, upCard };
};
