import { createRoot } from 'react-dom/client';
import './style.css';

import { App } from './App';

const startGame = () => {
  const app = document.getElementById('app');
  if (!app) throw new Error('oops');
  const root = createRoot(app);
  root.render(<App />);
};

startGame();
