import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import items from './items'
import currency from './currency'
import sort from './sort'
import logs from './logs'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    currency,
    items,
    sort,
    logs
  })

export default createRootReducer
