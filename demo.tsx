import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DemoPage from './app/demo-page';
import './app/globals.css';
import './app/demo.css';

createRoot(document.getElementById('root')!).render(<StrictMode><DemoPage /></StrictMode>);
