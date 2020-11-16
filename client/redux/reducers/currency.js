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
  return (dispatch, getState) => {
    const store = getState()
    const { value: oldValue } = store.currency
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

    if (oldValue !== currencyValue) {
      axios({
        method: 'post',
        url: '/api/v1/logs',
        data: {
          time: +new Date(),
          action: `change currency from ${oldValue} to ${currencyValue}`
        }
      }).catch((err) => console.log(err))
    }
  }
}
