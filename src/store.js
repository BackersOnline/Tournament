import { createStore, combineReducers } from 'redux';
import contractData from './reducers/contract-data';
import signIn from './reducers/sign-in';

let store = createStore(combineReducers({
  contract: contractData,
  signIn: signIn
}));

export default store;