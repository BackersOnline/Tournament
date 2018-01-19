import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Tournament from './client/components/tournament.jsx'
import Store from './store'
import './client/static/style/main.scss'

render (
  <Provider store={Store}>
    <Tournament/>
  </Provider>,
  document.querySelector('#root')
)