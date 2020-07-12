import Immutable from 'immutable';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { setupCognito, CognitoState } from 'react-cognito';
import Amplify from "aws-amplify";

const  cognitoConfig = {
  region: process.env.REGION,
  userPool: process.env.USER_POOL_ID,
  identityPool: process.env.IDENTITY_POOL,
  clientId: process.env.CLIENT_ID
}


Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REGION,
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId:  process.env.CLIENT_ID
  }
});




const debugForEnv = ['dev','test'];

const createMiddlewares = (debug) => {
  const middlewares = [reduxThunk];

  if (debug && typeof window !== 'undefined') {
    middlewares.push(
      createLogger({
        level: 'info',
        collapsed: true,
        stateTransformer: (state) => {
          const newState = {};

          for (const i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
              newState[i] = state[i].toJS();
            } else {
              newState[i] = state[i];
            }
          }

          return newState;
        },
      })
    );
  }

  return middlewares;
};

const immutableChildren = (obj) => {
  const state = {};
  Object.keys(obj).forEach((key) => {
    state[key] = Immutable.fromJS(obj[key]);
  });
  return state;
};

export default (initialState = {}) => {
  const debug = debugForEnv.includes(process.env.ENV);
  const middlewares = createMiddlewares(debug);
  const state = immutableChildren(initialState);
  const composeEnhancers = compose(
    debug && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : (f) => f
  );

  let store = createStore(
    rootReducer,
    state,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  setupCognito(store, cognitoConfig);
  return store;
};


