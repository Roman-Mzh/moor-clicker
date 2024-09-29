import '@mantine/core/styles.css';

import { Box, Flex, MantineProvider, Tabs } from '@mantine/core';
import { IconBuildingBank, IconHome } from '@tabler/icons-react';
import { Cardz } from './components/Cardz';
import { Coin } from './components/Coin';
import { GameProvider } from './utils/ctx/GameProvider';

export const App = () => {
  return (
    <MantineProvider>
      <GameProvider>
        <Box h="100%" w="100%" maw={600} style={{ overflow: 'hidden' }}>
          <Tabs
            defaultValue="coin"
            inverted
            keepMounted={false}
            h="100%"
            component={Flex}
            display="flex"
            style={{ flexDirection: 'column' }}
          >
            <Tabs.Panel
              value="coin"
              style={{ flexGrow: 1, minHeight: 0, overflow: 'hidden' }}
            >
              <Coin />
            </Tabs.Panel>
            <Tabs.Panel
              value="cardz"
              style={{ flexGrow: 1, minHeight: 0, overflow: 'hidden' }}
            >
              <Cardz />
            </Tabs.Panel>

            <Tabs.List grow m={0}>
              <Tabs.Tab value="coin">
                <IconHome />
              </Tabs.Tab>
              <Tabs.Tab value="cardz">
                <IconBuildingBank />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Box>
      </GameProvider>
    </MantineProvider>
  );
};
