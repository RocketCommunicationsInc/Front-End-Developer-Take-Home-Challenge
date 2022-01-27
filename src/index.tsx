import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './App';

ReactDOM.render (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)


