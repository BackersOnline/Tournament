import { createStore, combineReducers } from 'redux';
import contractData from './reducers/contract-data';
import signIn from './reducers/sign-in';
import nav from './reducers/nav';

let store = createStore(combineReducers({
  contract: contractData,
  signIn: signIn,
  nav: nav
}));

export default store;