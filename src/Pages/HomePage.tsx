import React from 'react'
import Pizza from "../assets/hero_pizza.png"

const HomePage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl p-5">
          <div className="flex flex-col items-center p-6 bg-black shadow-lg py-24">
            <p className="text-white text-[40px] text-start font-bold">Order Food Anytime & anywhere</p>
            <span className="text-gray-300 text-sm text-start">Hey! Our delicious food is waiting for you, we are always near to you.</span>
            <div className="flex w-full max-w-md bg-white rounded-lg overflow-hidden shadow-md mt-5">
              <input
                type="text"
                placeholder="Search Restaurant by name, city & country"
                className="w-full p-2 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button className="px-4 py-2 font-medium text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 ease-in-out">
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
  )
}

export default HomePage
