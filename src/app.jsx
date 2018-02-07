import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './client/components/routes.jsx';
import Store from './store';
import './client/static/style/main.scss';
import './client/static/style/login.scss';
import './client/static/style/main-page.scss';
import './client/static/style/web3.scss';

render (
  <Provider store={Store}>
    <Routes/>
  </Provider>,
  document.querySelector('#root')
)