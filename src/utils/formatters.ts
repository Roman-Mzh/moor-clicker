export const formatPrice = (e: number) =>
  e.toLocaleString('RU-ru', {
    style: 'currency',
    currency: 'rub',
    maximumFractionDigits: 2,
  });
export const formatIncome = (e: number, arrow?: boolean) =>
  '+' +
  e.toLocaleString('RU-ru', { maximumFractionDigits: 2 }) +
  (arrow ? '↑' : '');
