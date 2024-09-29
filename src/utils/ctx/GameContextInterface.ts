import type { CardName, GameState } from '../interfaces/Moor.interface';

export interface GameContextInterface {
  state: GameState;
  buy: (id: CardName) => () => void;
  click: (qty?: number) => void;
}
