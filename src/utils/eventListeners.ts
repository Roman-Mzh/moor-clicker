import { calcCard } from './calc';
import { getCardElements, getElements } from './elements';
import { formatIncome, formatPrice } from './formatters';
import type { moorGame } from './game';
import { cardsNames } from './interfaces/Moor.interface';

export const runListeners = (game: ReturnType<typeof moorGame>) => {
  const { coin, balance, income } = getElements();

  const setData = () => {
    const { realCoinz, lastEvent } = game.getState();
    balance.innerText = formatPrice(realCoinz);
    income.innerText = formatIncome(lastEvent.totalIncome);
    cardsNames.forEach((name) => {
      const level = lastEvent.cards[name];
      const { nextCpm, nextPrice } = calcCard(name, level);
      const income = lastEvent.income[name];
      const disabled = nextPrice > Math.max(lastEvent.totalIncome, realCoinz);
      const { levelLabel, incomeLabel, nextIncomeLabel, btn } =
        getCardElements(name);

      levelLabel.innerText = String(level);
      if (level > 0) {
        levelLabel.classList.add('text-bg-success');
        levelLabel.classList.remove('text-bg-light');
      }
      incomeLabel.innerText = formatIncome(income);
      nextIncomeLabel.innerHTML = formatIncome(nextCpm, true);

      btn.innerText = formatPrice(nextPrice);
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
    coin.style.transform = `rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    coin.classList.remove('shadow');
  });
  coin.addEventListener('mouseup', () => {
    coin.style.transform = '';
    coin.classList.add('shadow');
  });
};
