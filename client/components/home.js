import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getItemsData } from '../redux/reducers/items'

const Home = () => {
  const itemList = useSelector((s) => s.items.list)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItemsData())
  }, [])

  return (
    <div className="flex flex-wrap justify-center">
      {itemList.map((item) => {
        return (
          <div key="key" className="bg-blue-100 pt-10 pb-10 flex flex-wrap justify-center">
            <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mb-10 ml-5 shadow-2xl">
              <div className="px-4 py-2 ">
                <h1 className="text-gray-900 font-bold text-3xl uppercase ">{item.title}</h1>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
              <img
                className="h-56 w-full object-cover mt-2"
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                alt="NIKE AIR"
              />
              <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                <h1 className="text-gray-200 font-bold text-xl">{item.price}</h1>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
                >
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// return (
//   <div key="key" className="bg-blue-100 pt-10 pb-10 flex flex-wrap justify-center">
//     <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mb-10 ml-5 shadow-2xl">
//       <div className="px-4 py-2 ">
//         <h1 className="text-gray-900 font-bold text-3xl uppercase ">Title</h1>
//         <p className="text-gray-600 text-sm mt-1">Description</p>
//       </div>
//       <img
//         className="h-56 w-full object-cover mt-2"
//         src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
//         alt="NIKE AIR"
//       />
//       <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
//         <h1 className="text-gray-200 font-bold text-xl">Price</h1>
//         <button
//           type="button"
//           className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
//         >
//           Добавить в корзину
//         </button>
//       </div>
//     </div>
//   </div>
// )
// }

Home.propTypes = {}

export default Home
