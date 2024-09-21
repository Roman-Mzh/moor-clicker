// import './style.css';

import { calcCard } from './utils/calc';
import { moorGame } from './utils/game';
import { cards, cardsNames, type CardName } from './utils/Moor.interface';

const buildCardHtml = (name: CardName, level: number, income: number) => {
  const card = cards[name];
  const { nextCpm, nextPrice } = calcCard(name, level);
  return `<div style="padding: 12px;">
    <div>${card.name} [${level}]</div>
    <div>perSec: ${income.toFixed(2)}</div>
    <button ${1} id="card-${name}">+${nextCpm.toFixed(2)} $${nextPrice.toFixed(2)}</button>
  </div>`;
};

const renderGame = () => {
  const balance = document.querySelector<HTMLDivElement>('#balance');
  const coin = document.querySelector<HTMLDivElement>('#coin');
  const income = document.querySelector<HTMLDivElement>('#income');
  const cardsList = document.querySelector<HTMLDivElement>('#cards');

  if (!balance || !coin || !income || !cardsList) throw new Error('oops');
  const game = moorGame();

  const render = () => {
    const { realCoinz, lastEvent } = game.getState();
    balance.innerHTML = realCoinz.toFixed(2);
    income.innerHTML = lastEvent.totalIncome.toFixed(2);

    cardsList.innerHTML = cardsNames
      .map((k) => buildCardHtml(k, lastEvent.cards[k], lastEvent.income[k]))
      .join('');

    cardsNames.forEach((name) => {
      const card = document.getElementById(`card-${name}`);
      if (!card) throw new Error('oops, no card');

      card.addEventListener('click', () => {
        game.upCard(name);
        render();
      });
    });
  };

  setInterval(render, 1000);

  coin.addEventListener('click', () => {
    game.click();
    render();
  });
};

renderGame();
