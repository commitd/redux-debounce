import { applyMiddleware, createStore } from 'redux'
import middleware from './middleware'
import reducers from './reducers'

export default () =>
  applyMiddleware(...middleware)(createStore)(reducers)
