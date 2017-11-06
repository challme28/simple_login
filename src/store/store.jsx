import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { actions as authActions } from '../modules/auth/duck';
import { rootEpic, rootReducer } from "../modules/index";

import type { authStateType } from "../modules/auth/duck";

const configureStore = (initialState?: authStateType) => {
  const middleware = [];
  const enhancers = [];

  //Redux observable
  const epic = createEpicMiddleware(rootEpic);
  middleware.push(epic);

  //Logger
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);

  const actionCreators = {
    ...authActions,
    ...routerActions
  };

  //Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  //Redux DevTools
  const composeEnhancers = composeWithDevTools({
    actionCreators
  });

  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  return createStore(rootReducer, initialState, enhancer);
};

export default configureStore;