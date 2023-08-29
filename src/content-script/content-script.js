import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import '../css/main.css';

const panel = document.createElement('div');

const root = createRoot(panel);
root.render(<App/>);

setTimeout(()=>{
  const parent = document.querySelector("div.right-container-inner")
  const box = document.querySelector("#danmukuBox")
  box && parent &&parent.insertBefore(panel, box) || document.body.appendChild(panel)
}, 5000)


