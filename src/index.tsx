import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './mock';
import GlobalStyle from './styles/global';
/**
 * This file can be ignored, please work in ./components/App.tsx
 */

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle></GlobalStyle>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
