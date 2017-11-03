import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import Routes from './routes';
import configureStore from './store/store';

const store = configureStore();
const history = syncHistoryWithStore()
ReactDom.render(
    <Provider store={store}>
    <Routes/>
    </Provider>,
  document.getElementById('root')
);