import { createStore, combineReducers } from 'redux'
import views from './reducers/views'

let store = createStore(combineReducers({
  views: views,
}))

export default store