import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import items from './items'
import currency from './currency'

const createRootReducer = (history) =>
  combineReducers({
    currency,
    items,
    router: connectRouter(history)
  })

export default createRootReducer
