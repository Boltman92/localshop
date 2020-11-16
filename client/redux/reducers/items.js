import axios from 'axios'

const GETIMESLIST = 'GETIMESLIST'
const UPDATEBASKET = 'UPDATEBASKET'
const REMOVEBASKETITEM = 'REMOVEBASKETITEM'
const REMOVEBASKETITEMS = 'REMOVEBASKETITEMS'

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
    case REMOVEBASKETITEM: {
      if (state.basketList.filter((e) => e === action.item).length !== 0) {
        state.basketList.splice(
          state.basketList.findIndex((e) => e.id === action.item.id),
          1
        )
      }
      return {
        ...state,
        basketList: [...state.basketList]
      }
    }
    case REMOVEBASKETITEMS: {
      // state.basketList.filter((e) => e !== action.item)
      return {
        ...state,
        basketList: [...state.basketList.filter((e) => e !== action.item)]
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

    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `add ${item.title} to the backet`
      }
    }).catch((err) => console.log(err))
  }
}

export function removeBasketItem(item) {

  axios({
    method: 'post',
    url: '/api/v1/logs',
    data: {
      time: +new Date(),
      action: `remove  one ${item.title} from the backet`
    }
  }).catch((err) => console.log(err))

  return (dispatch) => {
    dispatch({ type: REMOVEBASKETITEM, item })
  }
}

export function removeBasketItems(item) {
  
  axios({
    method: 'post',
    url: '/api/v1/logs',
    data: {
      time: +new Date(),
      action: `remove  all ${item.title} from the backet`
    }
  }).catch((err) => console.log(err))

  return (dispatch) => {
    dispatch({ type: REMOVEBASKETITEMS, item })
  }
}
