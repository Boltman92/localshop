import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Head from './head'
import { getCurrencyData } from '../redux/reducers/currency'
// import { updateCurrencyValueUSD, updateCurrencyValueCAD } from '../redux/reducers/items'

const Header = () => {
  // const currencyValueUSD = useSelector((s) => s.currency.valueUSD)
  // const currencyValueCAD = useSelector((s) => s.currency.valueCAD)

  const [currency, setCurrency] = useState('EUR')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrencyData(currency))
  }, [currency])

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-700 p-6">
      <Head title="Shop" />

      <Link id="brand-name" to="/">
        <div className="flex items-center flex-shrink-0 text-white mr-6 hover:text-red-600">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">localShop :)</span>
        </div>
      </Link>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-base lg:flex-grow">
          <p className="block mt-20 lg:inline-block lg:mt-2 ml-40 text-white mr-3">
            {' '}
            Отсортировать по:{' '}
          </p>
          <button
            id="#sort-price"
            type="button"
            className="block mt-4 lg:inline-block lg:mt-0 text-white  mr-3"
          >
            Цене
          </button>
          <p className="block mt-20 lg:inline-block lg:mt-2 text-white mr-3">или</p>
          <button
            id="#sort-name"
            type="button"
            className="block mt-4 lg:inline-block lg:mt-0 text-white  mr-3"
          >
            Названию
          </button>
        </div>

        <div className="text-base lg:flex-grow">
          <button
            id="#sort-price"
            type="button"
            className="block mt-4 lg:inline-block lg:mt-0 text-white  mr-3"
            onClick={() => setCurrency('USD')}
          >
            USD
          </button>
          <button
            id="#sort-price"
            type="button"
            className="block mt-4 lg:inline-block lg:mt-0 text-white  mr-3"
            onClick={() => setCurrency('EUR')}
          >
            EUR
          </button>
          <button
            id="#sort-price"
            type="button"
            className="block mt-4 lg:inline-block lg:mt-0 text-white"
            onClick={() => setCurrency('CAD')}
          >
            CAD
          </button>
        </div>
      </div>

      <div className="mr-10">
        <Link id="order-count" to="/">
          <div className="text-white pr-10 hover:text-red-600">Товаров в корзине —</div>
        </Link>
        <div className="text-white">Итого:</div>
      </div>
    </nav>
  )
}

Header.propTypes = {}

export default React.memo(Header)
