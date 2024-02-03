import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// JS and TS differ slightly here
// JS version:
// ReactDOM.createRoot(document.getElementById('root')).render(
// Without the '!' in the TS version the following error message would appear:
// Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element | DocumentFragment'.
// Type 'null' is not assignable to type 'Element | DocumentFragment'.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
