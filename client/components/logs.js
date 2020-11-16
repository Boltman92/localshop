import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLogs } from '../redux/reducers/logs'
// import Header from './header'
// import { useSelector, useDispatch } from 'react-redux'

// import { getItemsData } from '../redux/reducers/items'

const Logs = () => {
  const dispatch = useDispatch()
  const logs = useSelector((s) => s.logs.logs)
  console.log(logs)

  useEffect(() => {
    dispatch(getLogs())
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `navigate to ${window.location.pathname} page`
      }
    }).catch((err) => console.log(err))
  }, [])

  // useEffect(() => {
  //   dispatch(getLogs())
  // }, [])

  return (
    <div className="h-screen bg-gray-600">
      {/* <Header /> */}
      <div className="bg-gray-600 h-auto text-white font-bold rounded-lg lg p-10 m-0 p-0">
        <div className="flex flex-no-wrap justify-around">
          <div>
            <Link className="" to="/">
              В каталог
            </Link>
          </div>
          <div>
            <Link className="" to="/basket">
              В корзину
            </Link>
          </div>
        </div>
        <div className="mt-8 mb-8 text-center">История ваших действий:</div>
        {logs.map((item) => {
          return (
            <div className="flex flex-no-wrap mt-5" key={item.time}>
              <div>{Date(item.time)}</div>
              <div className="ml-5"> {item.action}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Logs.propTypes = {}

export default Logs
