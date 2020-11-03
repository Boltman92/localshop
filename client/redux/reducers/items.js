import axios from 'axios'

const GETIMESLIST = 'GETIMESLIST'
const UPDATEBASKET = 'UPDATEBASKET'

const initialState = {
  list: [],
  basketList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GETIMESLIST: {
      return {
        ...state,
        list: action.list
      }
    }
    case UPDATEBASKET: {
      return {
        ...state,
        basketList: [...state.basketList, ...action.item]
      }
    }
    default:
      return state
  }
}

export function getItemsData() {
  return (dispatch) => {
    axios('/api/itemslist/')
      .then((response) => {
        dispatch({ type: GETIMESLIST, list: response.data })
      })
      .catch(() => console.log('Что-то пошло не так'))
  }
}

export function updateBasket(item) {
  return (dispatch) => {
    dispatch({ type: UPDATEBASKET, item })
  }
}
