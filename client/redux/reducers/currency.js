import axios from 'axios'

const CURRENCY_DATA = 'CURRENCY_DATA'

const initialState = {
  value: 'EUR'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENCY_DATA: {
      return {
        ...state,
        value: action.currencyValue,
        valueUSD: action.USD,
        valueCAD: action.CAD
      }
    }
    default:
      return state
  }
}

export function getCurrencyData(currencyValue) {
  return (dispatch) => {
    axios('https://api.exchangeratesapi.io/latest')
      .then((response) => {
        dispatch({
          type: CURRENCY_DATA,
          currencyValue,
          USD: response.data.rates.USD,
          CAD: response.data.rates.CAD
        })
      })
      .catch(() => console.log('Что-то пошло не так'))
  }
}
