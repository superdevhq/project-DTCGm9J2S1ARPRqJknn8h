
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import App from './App.tsx';
import './index.css';

// Ensure THREE is properly initialized globally
window.THREE = THREE;

// Create root element
const root = createRoot(document.getElementById('root')!);

// Render the app without StrictMode for now
root.render(<App />);
