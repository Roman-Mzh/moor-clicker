import 'bootstrap/scss/bootstrap.scss';

import { calcCard } from './utils/calc';
import { moorGame } from './utils/game';
import { cards, cardsNames, type CardName } from './utils/Moor.interface';

const renderGame = () => {
  const balance = document.querySelector<HTMLDivElement>('#balance');
  const coin = document.querySelector<HTMLDivElement>('#coin');
  const income = document.querySelector<HTMLDivElement>('#income');
  const cardsList = document.querySelector<HTMLDivElement>('#cards');

  if (!balance || !coin || !income || !cardsList) throw new Error('oops');
  const game = moorGame();

  const buildCardHtml = (name: CardName) => {
    const { lastEvent, realCoinz } = game.getState();
    const level = lastEvent.cards[name];
    const income = lastEvent.income[name];
    const card = cards[name];
    const { nextCpm, nextPrice } = calcCard(name, level);
    const disabled = nextPrice > Math.max(lastEvent.totalIncome, realCoinz);
    return `<div class="col-6">
      <div class="border rounded-2 p-2 d-flex flex-column gap-4">
        <div class="d-flex justify-content-between align-items-start w-100">
          <div class="h4">${card.name}</div>
          <div class="badge text-bg-light" id="card-${name}-level">${level}</div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="h6 text-success" id="card-${name}-income">+${income.toFixed(2)}/sec</div>
        </div>
        <button id="card-${name}-btn" class="btn btn-outline-${disabled ? 'secondary' : 'primary'}" ${disabled ? 'disabled="disabled"' : ''}>+${nextCpm.toFixed(2)} $${nextPrice.toFixed(2)}</button>
      </div>
    </div>`;
  };

  const setData = () => {
    const { realCoinz, lastEvent } = game.getState();
    balance.innerText = realCoinz.toFixed(2);
    income.innerText = '+' + lastEvent.totalIncome.toFixed(2) + '/sec';
    cardsNames.forEach((name) => {
      const level = lastEvent.cards[name];
      const { nextCpm, nextPrice } = calcCard(name, level);
      const income = lastEvent.income[name];
      const disabled = nextPrice > Math.max(lastEvent.totalIncome, realCoinz);

      document.getElementById(`card-${name}-level`)!.innerText = String(level);
      document.getElementById(`card-${name}-income`)!.innerText =
        '+' + income.toFixed(2) + '/sec';
      const btn = document.querySelector<HTMLButtonElement>(
        `#card-${name}-btn`,
      )!;
      btn.innerText = `+${nextCpm.toFixed(2)} $${nextPrice.toFixed(2)}`;
      btn.disabled = disabled;
      if (disabled) {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-secondary');
      } else {
        btn.classList.remove('btn-outline-secondary');
        btn.classList.add('btn-primary');
      }
    });
  };

  const render = () => {
    const { realCoinz, lastEvent } = game.getState();
    balance.innerText = realCoinz.toFixed(2);
    income.innerText = '+' + lastEvent.totalIncome.toFixed(2) + '/sec';

    cardsList.innerHTML = cardsNames.map(buildCardHtml).join('');
  };

  setInterval(setData, 1000);
  // setTimeout(render, 1000);

  render();

  cardsNames.forEach((name) => {
    const card = document.getElementById(`card-${name}-btn`);
    if (!card) throw new Error('oops, no card');

    card.addEventListener('click', () => {
      game.upCard(name);
      setData();
    });
  });

  coin.addEventListener('click', () => {
    game.click();
    setData();
  });
  coin.addEventListener('mousedown', ({ offsetX, offsetY }) => {
    const moveX = Math.round((offsetX - 60) / 2);
    const moveY = Math.round((offsetY - 60) / 2);
    console.log(moveX, moveY);
    coin.style.transform = `rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    coin.classList.remove('shadow');
  });
  coin.addEventListener('mouseup', () => {
    coin.style.transform = '';
    coin.classList.add('shadow');
  });
};

renderGame();
