import type { CardName, MoorCardType } from './interfaces/Moor.interface';

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

const img = (name: string) => {
  return new URL(`/src/utils/pics/${name}.jpg`, import.meta.url).href;
};

export const buildCardHtml = (card: MoorCardType) => {
  const { pic, title, id } = card;

  return `<div class="col-6 flex-grow-1">
    <div class="border rounded-2 p-2 vstack h-100 overflow-hidden">
      <div class="d-flex flex-grow-1 mx-n2 mt-n2" style="max-height: 120px;">
        <img class="img-fluid" src="${img(pic)}" style="object-fit: cover;" />
      </div>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div class="fs-4">${title}</div>
        <div class="badge text-bg-light" id="card-${id}-level"></div>
      </div>
      <div class="vstack align-items-center flex-grow-0">
        <div class="h6" id="card-${id}-income"></div>
        <div class="h6 text-success" id="card-${id}-next-income"></div>
      </div>
      <button id="card-${id}-btn" class="btn"></button>
    </div>
  </div>`;
};

export const bubble = (x: number, y: number) => {
  const b = document.createElement('div');
  b.style.left = `${x - 15}px`;
  b.style.top = `${y - 15}px`;
  b.style.position = 'absolute';
  b.classList.add('moor-bubble');
  b.innerText = '+1';
  document.body.appendChild(b);
  b.getBoundingClientRect();
  b.style.transform = `translate(${Math.round(Math.random() * 80) - 40}px, -100px)`;
  b.style.opacity = '0';
  setTimeout(b.remove, 1000);
};
