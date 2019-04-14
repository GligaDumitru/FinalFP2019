import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { createLogger } from "redux-logger";

const initialState = {};

// to console.log prev state, action and current state
const logger = createLogger();

const middleware = [thunk];

//creating store
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
  )
);

export default store;
