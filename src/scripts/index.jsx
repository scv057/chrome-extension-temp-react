import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import '../css/main.css';

const panel = document.createElement('div');

const root = createRoot(panel);
root.render(<App/>);



const b = document.querySelector("#app > div.video-container-v1 >" +
    " div.right-container.is-in-large-ab > div > div.up-panel-container")

console.log('content');


setTimeout(()=>{
  document.body.appendChild(panel)
}, 0)


