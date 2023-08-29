import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import '../css/main.css';

const panel = document.createElement('div');
panel.classList.add('gpt_box');

const root = createRoot(panel);
root.render(<App/>);

function mount(){
  const box = document.querySelector('#danmukuBox');
  box?.parentNode?.insertBefore(panel, box);
}

new MutationObserver(()=>{
  !document.querySelector('#danmukuBox') ||
  document.getElementsByClassName('gpt_box')[0] || mount();
}).observe(document.body,{attributes: true, childList:true,
  characterData: true})

