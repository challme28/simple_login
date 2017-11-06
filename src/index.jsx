import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Routes from './routes';
import configureStore from './store/store';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
ReactDom.render(
  <Provider store={store}>
      <Routes history={history}/>
  </Provider>,
  document.getElementById('root')
);