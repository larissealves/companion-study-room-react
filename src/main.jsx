{/*import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importe o CSS global aqui
import './styles/global.css';
import './styles/animacoes.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    <Route path="/creditos" element={<Creditos />} />
  </React.StrictMode>
);*/}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

import './styles/global.css';
import './styles/animacoes.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
