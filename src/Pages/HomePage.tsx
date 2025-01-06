import React, { useState, useEffect } from 'react'
import Pizza from "../assets/hero_pizza.png"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SetSearchByCountry } from '../Redux/Features/SearchByCountrtSlice'
import { AppDispatch, RootState } from '../Redux/Store/Store'
import RestaurantPages from '../AdminPages/RestaurantPages'
import { FetchingUserData } from '../Redux/Features/UserSlice'

const HomePage: React.FC = () => {
  const [search, setSearch] = useState<string>(''); // Fix state initialization
  const Navigate = useNavigate()
  const Dispatch: AppDispatch = useDispatch()
  const user = useSelector((state: RootState) => state.User.User)

  useEffect(() => {
    Dispatch(FetchingUserData())
  }, [Dispatch])

  const token = localStorage.getItem("Token")
  const SearchToCountry = () => {
    if (search.length) {
      if (!token) {
        Navigate("/LoginPage")
      }
      Dispatch(SetSearchByCountry([{ Country: search }]));
      Navigate("/SearchPage")
    }
  }

  return (
    <>
      {user?.role === "customer" || user === null ?
        <>
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl p-5">
              <div className="flex flex-col items-center p-6 bg-black shadow-lg py-24">
                <p className="text-white text-[40px] md:text-start font-bold text-center">Order Food Anytime & anywhere</p>
                <span className="text-gray-300 text-sm text-start">Hey! Our delicious food is waiting for you, we are always near to you.</span>
                <div className="flex md:w-full max-w-md bg-white rounded-lg overflow-hidden shadow-md mt-5 w-[330px]">
                  <input
                    type="text"
                    title='Search Restaurant by name, city & country'
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Restaurant by & Country"
                    className="w-full p-2 text-gray-700 placeholder-gray-400 text-[15px] focus:outline-none hover:border bg-border"
                  />
                  <button className="md:px-4 md:py-2 px-[12px] py-2 font-medium text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 ease-in-out" onClick={() => SearchToCountry()}>
                    Search
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <img src={Pizza} alt="Delicious pizza" className=" object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </>
        :
        <>
          <RestaurantPages />
        </>
      }
    </>
  )
}

export default HomePage
