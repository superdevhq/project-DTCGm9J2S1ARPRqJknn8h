
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';

// Create root element
const root = createRoot(document.getElementById('root')!);

// Render the app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
