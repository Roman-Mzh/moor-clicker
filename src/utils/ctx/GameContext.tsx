import { createContext } from 'react';
import type { GameContextInterface } from './GameContextInterface';

export const GameContext = createContext<GameContextInterface | undefined>(
  undefined,
);
