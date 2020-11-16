import axios from 'axios'

const GETLOGS = 'GETLOGS'

const initialState = {
  logs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GETLOGS: {
      return {
        ...state,
        logs: action.logs
      }
    }
    default:
      return state
  }
}

export function getLogs() {
  return (dispatch) => {
    axios('/api/v1/logs')
      .then((response) => {
        dispatch({ type: GETLOGS, logs: response.data })
      })
      .catch(() => console.log('Что-то пошло не так'))
  }
}
