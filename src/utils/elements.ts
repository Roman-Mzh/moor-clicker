export const bubble = (x: number, y: number) => {
  const b = document.createElement('div');
  b.style.left = `${x - 10}px`;
  b.style.top = `${y - 10}px`;
  b.style.position = 'absolute';
  b.classList.add('moor-bubble');
  b.innerText = '+10';
  document.body.appendChild(b);
  b.getBoundingClientRect();
  b.style.transform = `translate(${Math.round(Math.random() * 80) - 40}px, -300px) rotate(${45 - Math.round(Math.random() * 90)}deg)`;
  b.style.opacity = '0';
  setTimeout(() => b.remove(), 900);
};
