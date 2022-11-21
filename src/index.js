import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ContainerContextProvider } from './context/container-context';
import { AppContextProvider } from './context/app-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContextProvider>
    <ContainerContextProvider>
      {' '}
      <App />
    </ContainerContextProvider>
  </AppContextProvider>
);
