import {
  Badge,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Stack,
  Text,
} from '@mantine/core';
import { useMemo } from 'react';
import { calcCard } from '../utils/calc';
import { gameCards } from '../utils/constants/cards';
import { formatIncome, formatPrice } from '../utils/formatters';
import { useGame } from '../utils/hooks/useGame';
import { cardsNames } from '../utils/interfaces/Moor.interface';
import { BuyButton } from './BuyButton';

const img = (name: string) => {
  return new URL(`/src/utils/pics/${name}.jpg`, import.meta.url).href;
};

export const Cardz = () => {
  const {
    state: {
      realCoinz,
      lastEvent: { cards, income, totalIncome },
    },
  } = useGame();

  const cardCardz = useMemo(
    () =>
      cardsNames.map((id) => {
        const lv = cards[id];
        const inc = income[id];
        const { pic, title } = gameCards[id];
        const { nextCpm } = calcCard(id, lv);

        return (
          <Grid.Col span={6} key={id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={img(pic)} height={120} alt="Norway" />
              </Card.Section>
              <Card.Section p="xs">
                <Stack>
                  <Flex align={'center'} gap={'xs'}>
                    <Badge color="teal">{lv}</Badge>
                    <Text span style={{ flexGrow: 1 }}>
                      {title}
                    </Text>
                  </Flex>
                  <Flex align="baseline" justify={'center'} gap="xs">
                    <Text span fw={800} fz="xl">
                      {formatIncome(inc)}
                    </Text>
                    <Text span size="xs" c="teal">
                      ({formatIncome(nextCpm, true)})
                    </Text>
                  </Flex>
                  <BuyButton {...{ id, lv }} />
                </Stack>
              </Card.Section>
            </Card>
          </Grid.Col>
        );
      }),
    [cards, income],
  );

  return (
    <Stack gap={0} mih={0} style={{ flexGrow: 1 }} mah="100%">
      <Group
        justify={'end'}
        p="xs"
        style={{
          boxShadow: 'var(--mantine-shadow-sm)',
        }}
      >
        <Text span fw={800}>
          {formatPrice(realCoinz)}
        </Text>

        <Text fs="xs" c="teal" span>
          {formatIncome(totalIncome)}
        </Text>
      </Group>
      <Grid gutter={'xs'} p="xs" overflow="auto" mih={0}>
        {cardCardz}
      </Grid>
    </Stack>
  );
};
