import { calcCard, totalCpm } from './calc';
import { IS_DEV } from './constants/global';
import { SECONDS_FOR_INCOME } from './constants/rates';
import {
  type CardName,
  cardsNames,
  type GameState,
  type MoorEventType,
} from './interfaces/Moor.interface';

const initialCards = () => {
  let totalIncome = 0;
  const cards = {} as MoorEventType['cards'];
  const income = {} as MoorEventType['income'];
  cardsNames.forEach((name) => {
    const level = IS_DEV ? Math.round(Math.random() * 5) : 0;
    const cpm = totalCpm(name, level);
    cards[name] = level;
    income[name] = cpm;
    totalIncome += cpm;
  });

  return { cards, income, totalIncome };
};

export const moorGame = () => {
  const initialEvent: MoorEventType = {
    coinz: IS_DEV ? 99999 : 0,
    timestamp: Date.now(),
    ...initialCards(),
  };
  const events: MoorEventType[] = [];
  const start = () => {
    events.push(initialEvent);
  };

  const getState = (): GameState => {
    const lastEvent = events.at(-1);
    if (!lastEvent) throw new Error('could not start game');
    const now = Date.now();

    const realCoinz =
      lastEvent.coinz +
      ((now - lastEvent.timestamp) / (1000 * SECONDS_FOR_INCOME)) *
        lastEvent.totalIncome;
    return { lastEvent, realCoinz };
  };

  const click = (qty: number = 1): MoorEventType => {
    const { lastEvent, realCoinz } = getState();
    const nextEvent = {
      ...lastEvent,
      coinz: Math.max(realCoinz, lastEvent.coinz) + 10 * qty,
      timestamp: Date.now(),
    };
    events.pop(); // =)
    events.push(nextEvent);

    return nextEvent;
  };

  const upCard = (name: CardName): MoorEventType => {
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

export const game = moorGame();
