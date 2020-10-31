import axios from 'axios'

const GETIMESLIST = 'GETIMESLIST'

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GETIMESLIST: {
      return {
        ...state,
        list: action.list
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
