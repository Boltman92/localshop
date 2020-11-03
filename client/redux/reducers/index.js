import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import items from './items'
import currency from './currency'
import sort from './sort'

const createRootReducer = (history) =>
  combineReducers({
    currency,
    items,
    sort,
    router: connectRouter(history)
  })

export default createRootReducer
