import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import '../css/main.css';

const app = document.createElement('div');
const root = createRoot(app);
root.render(<App/>)
document.body.appendChild(app);
