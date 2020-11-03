
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
  return (dispatch) => {
    dispatch({ type: UPDATESORTMETHODE, sort })
  }
}

// export function updateSortMethode(sort) {
//   return { type: UPDATESORTMETHODE, sort }
// }