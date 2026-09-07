import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GuidePage from './app/guide-page';
import './app/globals.css';
import './app/guide.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><GuidePage /></StrictMode>,
);
