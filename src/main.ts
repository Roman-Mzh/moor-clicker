import './style.scss';

import { cards } from './utils/constants/cards';
import { buildCardHtml, getElements } from './utils/elements';
import { runListeners } from './utils/eventListeners';
import { formatIncome, formatPrice } from './utils/formatters';
import { moorGame } from './utils/game';
import { cardsNames } from './utils/interfaces/Moor.interface';

const startGame = () => {
  const game = moorGame();
  const { balance, cardsList, income } = getElements();

  const drawGame = () => {
    const { realCoinz, lastEvent } = game.getState();
    balance.innerText = formatPrice(realCoinz);
    income.innerText = formatIncome(lastEvent.totalIncome);

    cardsList.innerHTML = cardsNames
      .map((e) => buildCardHtml(cards[e]))
      .join('');
  };

  drawGame();
  runListeners(game);
};

startGame();
