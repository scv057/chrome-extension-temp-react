import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import '../css/main.css';
import insertAfter from '../utils/insertAfter';

document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<App/>);

// const panel = document.createElement('div');
//
// const root = createRoot(panel);


// const b = document.querySelector("#app > div.video-container-v1 >" +
//     " div.right-container.is-in-large-ab > div > div.up-panel-container")
//
//
// insertAfter(panel, b);

