import { createStore, combineReducers } from 'redux';
import contractData from './reducers/contract-data';
import signIn from './reducers/sign-in';
import nav from './reducers/nav';
import date from './reducers/date';

let store = createStore(combineReducers({
  contract: contractData,
  signIn: signIn,
  nav: nav,
  date: date
}));

export default store;