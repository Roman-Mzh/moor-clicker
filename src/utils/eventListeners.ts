import { calcCard } from './calc';
import { getElements } from './elements';
import type { moorGame } from './game';
import { cardsNames } from './interfaces/Moor.interface';

export const runListeners = (game: ReturnType<typeof moorGame>) => {
  const { coin, balance, income } = getElements();

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
        income.toFixed(2) + '/sec';
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

  setInterval(setData, 1000);

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
