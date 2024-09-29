import { useContext } from 'react';
import { GameContext } from '../ctx/GameContext';

export const useGame = () => {
  const ctx = useContext(GameContext);

  if (!ctx) throw new Error('wow');
  return ctx;
};
