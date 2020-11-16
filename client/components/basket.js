import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBasket, removeBasketItem, removeBasketItems } from '../redux/reducers/items'
import Head from './head'
import Header from './header'
import Footer from './footer'

const Basket = () => {
  const dispatch = useDispatch()
  const basketList = useSelector((s) => s.items.basketList)
  const currencyValue = useSelector((s) => s.currency.value)
  const currencyValueUSD = useSelector((s) => s.currency.valueUSD)
  const currencyValueCAD = useSelector((s) => s.currency.valueCAD)
  const sortMethode = useSelector((s) => s.sort.sortMethode)
  const itemList = useSelector((s) => s.items.list)
  const CAD = 'CAD'
  const USD = 'USD'
  const EUR = 'EUR'
  const [price, setPrice] = useState(1)
  const [deliveryPrice, setDeliveryPrice] = useState(10 * price)
  const total = basketList.reduce((acc, rec) => acc + rec.price, 0)
  const filterBasketList = basketList.filter((item, id, array) => array.indexOf(item) === id)

  const [basket, setBasket] = useState(filterBasketList)
  const [items, setItems] = useState(itemList)

  console.log(items)

  function sort() {
    if (sortMethode === 'Price') {
      return [
        ...filterBasketList.sort(function (a, b) {
          return a.price - b.price
        })
      ]
    }
    return [
      ...filterBasketList.sort(function (a, b) {
        const x = a.title.toLowerCase()
        const y = b.title.toLowerCase()
        if (x < y) {
          return -1
        }
        if (x > y) {
          return 1
        }
        return 0
      })
    ]
  }
  sort()

  function updateCurrencyValue() {
    if (currencyValue === USD) {
      setPrice(currencyValueUSD)
    } else if (currencyValue === CAD) {
      setPrice(currencyValueCAD)
    } else if (currencyValue === EUR) {
      setPrice(1)
    }
    return price
  }

  useEffect(() => {
    updateCurrencyValue()
  }, [currencyValue])

  useEffect(() => {
    setBasket(sort())
  }, [])

  useEffect(() => {
    setBasket(sort())
  }, [sortMethode])

  useEffect(() => {
    setItems(sort())
  }, [sortMethode])

  function buttonRemoveItemsFromBasket(item) {
    dispatch(removeBasketItems(item))
  }

  function buttonRemoveFromBasket(item) {
    dispatch(removeBasketItem(item))
  }

  function buttonAddToBasket(item) {
    dispatch(updateBasket(item))
  }

  useEffect(() => {
    setDeliveryPrice(10 * price)
  }, [price])

  return (
    <div className="bg-blue-100">
      <Head />
      <Header />
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md ">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-xl">Заказ</h1>
              <h2 className="font-semibold text-xl">К оформлению {basketList.length} шт.</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Информация о товаре
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Количество
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Цена
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Итоговая стоимость
              </h3>
            </div>

            {basket.map((item) => {
              if (basketList.filter((el) => el === item).length !== 0) {
                return (
                  <div
                    key={item.id}
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                  >
                    <div className="flex w-2/5">
                      <div className="w-20 ">
                        <img
                          id="product__image"
                          className="object-scale-down h-30 w-full"
                          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-2 flex-grow">
                        <span id="product__title" className="font-bold text-sm">
                          {item.title}
                        </span>
                        <span id="description" className="text-xs">
                          {item.description}
                        </span>
                        <button
                          type="button"
                          className="fill-current mr-auto font-semibold hover:text-red-500 text-gray-500 text-xs"
                          onClick={() => buttonRemoveItemsFromBasket(item)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <button
                        id="product__remove"
                        type="button"
                        className="fill-current text-gray-900 w-7 text-2xl"
                        viewBox="0 0 448 512"
                        onClick={() => buttonRemoveFromBasket(item)}
                      >
                        {' '}
                        -
                      </button>

                      <input
                        id="product__amout"
                        className="mx-2 border text-center w-8"
                        type="text"
                        value={basketList.filter((el) => el === item).length}
                      />

                      <button
                        id="product__add"
                        type="button"
                        className="fill-current text-gray-900 w-7 text-2xl"
                        viewBox="0 0 448 512"
                        onClick={() => buttonAddToBasket(item)}
                      >
                        {' '}
                        +
                      </button>
                    </div>
                    <span id="product__price" className="text-center w-1/5 font-semibold text-sm">
                      {(item.price * price).toFixed(2)} {currencyValue}
                    </span>
                    <span
                      id="product__total_price"
                      className="text-center w-1/5 font-semibold text-sm"
                    >
                      {(
                        basketList.filter((el) => el === item).length *
                        (item.price * price)
                      ).toFixed(2)}{' '}
                      {currencyValue}
                    </span>
                  </div>
                )
              }
              return ''
            })}

            <Link to="/" className="flex w-48  font-semibold text-indigo-600 text-sm mt-10">
              <svg className="fill-current  mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Продолжить шоппинг
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10 bg-orange-100">
            <h1 className="font-semibold text-xl border-b pb-8">Итого</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">{basketList.length} товаров</span>
              <span className="font-semibold text-sm">
                {(total * price).toFixed(2)} {currencyValue}
              </span>
            </div>
            <div>
              <label htmlFor="check1" className="font-medium inline-block mb-3 text-sm uppercase">
                Доставка
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>
                  Стандартная доставка - {(10 * price).toFixed(2)} {currencyValue}
                </option>
              </select>
            </div>
            <div className="py-10">
              <label htmlFor="check2" className="font-semibold inline-block mb-3 text-sm uppercase">
                Промокод
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Введите промокод"
                className="p-2 text-sm w-full"
              />
            </div>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
            >
              Подтвердить
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>К оплате</span>
                <span>
                  {(total * price + deliveryPrice).toFixed(2)} {currencyValue}
                </span>
              </div>
              <button
                type="button"
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
              >
                Оплатить
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

Basket.propTypes = {}

export default Basket
