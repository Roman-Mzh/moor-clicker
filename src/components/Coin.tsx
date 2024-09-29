import { Box, Image, Stack, Text } from '@mantine/core';
import { bubble } from '../utils/elements';
import { formatIncome, formatPrice } from '../utils/formatters';
import { useGame } from '../utils/hooks/useGame';
import h from '../utils/pics/coin.jpg';

export const Coin = () => {
  const {
    click,
    state: {
      realCoinz,
      lastEvent: { totalIncome },
    },
  } = useGame();
  const handleClick = (e: React.MouseEvent) => {
    bubble(e.clientX, e.clientY);
    click();
  };
  const handlePress = (e: React.TouchEvent) => {
    const t = e.touches;
    click(t.length);
    for (let i = 0; i < t.length; i++) {
      const thisTouch = t.item(i);
      bubble(thisTouch.clientX, thisTouch.clientY);
    }
  };
  return (
    <Stack h="100%" align="center" p="xs" mih={0} style={{ overflow: 'auto' }}>
      <Text
        variant="gradient"
        gradient={{ from: 'red', to: 'blue' }}
        fz={50}
        style={{ flexGrow: 1 }}
      >
        {formatPrice(realCoinz)}
      </Text>
      <Text c="teal" fz={40} style={{ flexGrow: 1 }}>
        {formatIncome(totalIncome)}
      </Text>
      <Box p="xl">
        <Image
          onTouchStart={handlePress}
          onClick={handleClick}
          src={h}
          style={{
            borderRadius: '100%',
            boxShadow: 'var(--mantine-shadow-md)',
          }}
        />
      </Box>
    </Stack>
  );
};
