import { Button } from '@mantine/core';
import type { FC } from 'react';
import { calcCard } from '../utils/calc';
import { formatPrice } from '../utils/formatters';
import { useGame } from '../utils/hooks/useGame';
import type { CardName } from '../utils/interfaces/Moor.interface';

export const BuyButton: FC<{ id: CardName; lv: number }> = ({ id, lv }) => {
  const {
    buy,
    state: { realCoinz },
  } = useGame();
  const { nextPrice } = calcCard(id, lv);
  return (
    <Button
      size="compact-xs"
      onClick={buy(id)}
      disabled={nextPrice > realCoinz}
    >
      {formatPrice(nextPrice)}
    </Button>
  );
};
