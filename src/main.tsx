
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create root element
const root = createRoot(document.getElementById('root')!);

// Render the app without StrictMode for now
root.render(<App />);
