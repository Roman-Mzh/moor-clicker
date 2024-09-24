export const getElements = () => {
  const balance = document.querySelector<HTMLDivElement>('#balance');
  const coin = document.querySelector<HTMLDivElement>('#coin');
  const income = document.querySelector<HTMLDivElement>('#income');
  const cardsList = document.querySelector<HTMLDivElement>('#cards');

  if (!balance || !coin || !income || !cardsList) throw new Error('oops');
  return { balance, cardsList, coin, income };
};
