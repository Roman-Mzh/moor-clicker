import type { CardName } from './interfaces/Moor.interface';

export const getElements = () => {
  const balance = document.querySelector<HTMLDivElement>('#balance');
  const coin = document.querySelector<HTMLDivElement>('#coin');
  const income = document.querySelector<HTMLDivElement>('#income');
  const cardsList = document.querySelector<HTMLDivElement>('#cards');

  if (!balance || !coin || !income || !cardsList) throw new Error('oops');
  return { balance, cardsList, coin, income };
};

export const getCardElements = (name: CardName) => {
  const levelLabel = document.getElementById(`card-${name}-level`);
  const incomeLabel = document.getElementById(`card-${name}-income`);
  const nextIncomeLabel = document.getElementById(`card-${name}-next-income`);
  const btn = document.querySelector<HTMLButtonElement>(`#card-${name}-btn`);

  if (!levelLabel || !incomeLabel || !nextIncomeLabel || !btn)
    throw new Error('oops');

  return { levelLabel, incomeLabel, nextIncomeLabel, btn };
};
