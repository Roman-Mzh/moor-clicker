import 'bootstrap/scss/bootstrap.scss';

import { calcCard } from './utils/calc';

import { cards } from './utils/constants/cards';
import { getElements } from './utils/elements';
import { runListeners } from './utils/eventListeners';
import { moorGame } from './utils/game';
import { cardsNames, type CardName } from './utils/interfaces/Moor.interface';

const img = (name: string) => {
  return new URL(`/src/utils/pics/${name}.jpg`, import.meta.url).href;
};

const startGame = () => {
  const game = moorGame();
  const { balance, cardsList, income } = getElements();
  const buildCardHtml = (name: CardName) => {
    const { lastEvent, realCoinz } = game.getState();
    const level = lastEvent.cards[name];
    const income = lastEvent.income[name];
    const card = cards[name];
    const { nextCpm, nextPrice } = calcCard(name, level);
    const disabled = nextPrice > Math.max(lastEvent.totalIncome, realCoinz);
    return `<div class="col-6">
      <div class="border rounded-2 p-2 d-flex flex-column gap-2">
        <div class="d-flex justify-content-between align-items-start w-100">
          <div class="h4">${card.name}</div>
          <div class="badge text-bg-light" id="card-${name}-level">${level}</div>
        </div>
        <img class="img-fluid" src="${img(card.pic)}" style="max-height: 140px; object-fit: cover;" />
        <div class="d-flex justify-content-center">
          <div class="h6 text-success" id="card-${name}-income">${income.toFixed(2)}/sec</div>
        </div>
        <button id="card-${name}-btn" class="btn btn-outline-${disabled ? 'secondary' : 'primary'}" ${disabled ? 'disabled="disabled"' : ''}>+${nextCpm.toFixed(2)} $${nextPrice.toFixed(2)}</button>
      </div>
    </div>`;
  };

  const drawGame = () => {
    const { realCoinz, lastEvent } = game.getState();
    balance.innerText = realCoinz.toFixed(2);
    income.innerText = '+' + lastEvent.totalIncome.toFixed(2) + '/sec';

    cardsList.innerHTML = cardsNames.map(buildCardHtml).join('');
  };

  drawGame();
  runListeners(game);
};

startGame();
