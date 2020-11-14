import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getItemsData, updateBasket } from '../redux/reducers/items'

const Itemlist = () => {
  const itemList = useSelector((s) => s.items.list)
  const currencyValue = useSelector((s) => s.currency.value)
  const currencyValueUSD = useSelector((s) => s.currency.valueUSD)
  const currencyValueCAD = useSelector((s) => s.currency.valueCAD)
  const sortMethode = useSelector((s) => s.sort.sortMethode)
  const basketList = useSelector((s) => s.items.basketList)
  const dispatch = useDispatch()

  const CAD = 'CAD'
  const USD = 'USD'
  const EUR = 'EUR'

  const [price, setPrice] = useState(1)
  const [items, setItems] = useState(itemList)

  useEffect(() => {
    dispatch(getItemsData())
  }, [])

  function sort() {
    if (sortMethode === 'Price') {
      return [
        ...itemList.sort(function (a, b) {
          return a.price - b.price
        })
      ]
    }
    return [
      ...itemList.sort(function (a, b) {
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

  // useEffect(() => {
  //   setItems(sort())
  // }, [])

  useEffect(() => {
    setItems(itemList)
  }, [itemList])

  useEffect(() => {
    setItems(sort())
  }, [])

  useEffect(() => {
    setItems(sort())
  }, [sortMethode])

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

  function addToBasket(item) {
    dispatch(updateBasket(item))
  }

  return (
    <div className="flex flex-wrap justify-center bg-blue-100">
      {items.map((item) => {
        return (
          <div key={item.id} className="bg-blue-100 pt-10 flex flex-wrap justify-center ">
            <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mb-10 ml-5">
              <div className="px-4 py-2  ">
                <h1 className="text-gray-900 font-bold text-sm uppercase ">{item.title}</h1>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
              <img
                className="h-56 w-full object-cover mt-2"
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                alt="NIKE AIR"
              />
              <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                <h1 className="text-gray-200 font-bold text-xl">
                  {(item.price * price).toFixed(2)} {currencyValue}
                </h1>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
                  onClick={() => addToBasket(item)}
                >
                  Добавить в корзину{' '}
                  {basketList.filter((el) => el === item).length === 0
                    ? ''
                    : basketList.filter((el) => el === item).length}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

Itemlist.propTypes = {}

export default Itemlist
