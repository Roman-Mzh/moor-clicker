import {
  useCallback,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import { game } from '../game';
import type { CardName, GameState } from '../interfaces/Moor.interface';
import { GameContext } from './GameContext';

export const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<GameState>(game.getState());
  const buy = useCallback(
    (id: CardName) => () => {
      try {
        const nextState = game.upCard(id);
        setState({ lastEvent: nextState, realCoinz: nextState.coinz });
      } catch (e) {
        console.log(e);
      }
    },
    [],
  );
  const click = useCallback((qty?: number) => {
    const nextState = game.click(qty);

    setState({ lastEvent: nextState, realCoinz: nextState.coinz });
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setState(game.getState());
    }, 1000);

    return () => clearInterval(i);
  }, []);

  return (
    <GameContext.Provider value={{ state, buy, click }}>
      {children}
    </GameContext.Provider>
  );
};
