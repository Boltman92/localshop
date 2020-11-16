import axios from 'axios'

const UPDATESORTMETHODE = 'UPDATESORTMETHODE'


const initialState = {
  sortMethode: 'none'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATESORTMETHODE: {
      return {
        ...state,
        sortMethode: action.sort
      }
    }
    default:
      return state
  }
}

export function updateSortMethode(sort) {
  
  axios({
    method: 'post',
    url: '/api/v1/logs',
    data: {
      time: +new Date(),
      action: `sort by ${sort} methode`
    }
  }).catch((err) => console.log(err))

  return (dispatch) => {
    dispatch({ type: UPDATESORTMETHODE, sort })
  }
}

// export function updateSortMethode(sort) {
//   return { type: UPDATESORTMETHODE, sort }
// }
