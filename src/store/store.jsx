import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { actions as authActions } from '../modules/auth/duck';
import { createLogger } from 'redux-logger';
import { rootEpic, rootReducer } from "../modules/index";

const configureStore = (initialState?: todosStateType) => {
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
  };

  const composeEnhancers = composeWithDevTools({
    actionCreators
  });

  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  return createStore(rootReducer, initialState, enhancer);
};

export default configureStore;