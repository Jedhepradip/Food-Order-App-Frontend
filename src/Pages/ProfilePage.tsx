import React, { useState } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaCity, FaGlobe } from 'react-icons/fa';
import { IoMdCall } from "react-icons/io";
import { RxCross2 } from 'react-icons/rx';

const ProfilePage: React.FC = () => {
  const [showupdate, setshowupdate] = useState(false)

  const setshowmodel = () => {
    setshowupdate(true)
  }
  return (
    <>
      <div className='max-w-7xl mx-auto p-6 bg-black text-white shadow-md h-screen'>
        <div className='flex items-center mb-6'>
          <img
            src="https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg"
            alt="Profile"
            className='h-36 w-36 rounded-full object-cover'
          />
          <h1 className='px-7 py-10 text-3xl font-bold'>Pradip Jedhe</h1>
        </div>
        <div className='justify-around items-center text-lg grid md:grid-cols-5 grid-cols-2 gap-2'>
          <div className="flex flex-col py-1 px-6 bg-gray-700 relative text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            <div className="flex items-center">
              <FaEnvelope className="text-2xl text-gray-500 mr-2" />
              <span className="font-semibold text-lg tracking-wide text-gray-400">Email</span>
            </div>
            <p className="text-sm font-medium opacity-80 px-8 text-white">Pradipjedhe69@gmail.com</p>
          </div>

          <div className="flex flex-col py-1 px-6 bg-gray-700 relative text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            <div className="flex items-center">
              <IoMdCall className="text-2xl text-gray-500 mr-2" />
              <span className="font-semibold text-lg tracking-wide text-gray-400">Contact</span>
            </div>
            <p className="text-sm font-medium opacity-80 px-8 text-white">12345678909</p>
          </div>

          <div className="flex flex-col py-1 px-6 bg-gray-700 relative text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-2xl text-gray-500 mr-2" />
              <span className="font-semibold text-lg tracking-wide text-gray-400">Address</span>
            </div>
            <p className="text-sm font-medium opacity-80 px-8 text-white">123 Street Name</p>
          </div>

          <div className="flex flex-col py-1 px-6 bg-gray-700 relative text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            <div className="flex items-center">
              <FaCity className="text-2xl text-gray-500 mr-2" />
              <span className="font-semibold text-lg tracking-wide text-gray-400">City</span>
            </div>
            <p className="text-sm font-medium opacity-80 px-8">Mumbai</p>
          </div>

          <div className="flex flex-col py-1 px-6 bg-gray-700 relative text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            <div className="flex items-center">
              <FaGlobe className="text-2xl text-gray-500 mr-2" />
              <span className="font-semibold text-lg tracking-wide text-gray-400">Country</span>
            </div>
            <p className="text-sm font-medium opacity-80 px-8 text-white">India</p>
          </div>
        </div>
        <div className='w-full flex justify-center items-center' onClick={() => setshowmodel()}>
          <button className='md:w-[12%] w-[20%] py-2 mt-4 bg-orange-400 text-black font-semibold rounded-md hover:bg-orange-700 transition duration-300'>
            Update Profile
          </button>
        </div>
      </div>

      <div className='flex justify-center w-full '>
        {/* grid grid-cols-1 place-items-center fixed inset-0 z-50 bg-black/60 */}
        {showupdate && (
          <div className='fixed inset-0 z-50 bg-black/85 place-items-center grid grid-cols-1'>
            <div className="mt-6 p-6 bg-gray-900 rounded shadow-lg absolute z-50 w-[500px] ">
              <RxCross2 className='float-right text-white text-[23px]' onClick={() => setshowupdate(false)} />
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mb-4">

                  <div>
                    <label className="block text-[17px] font-medium text-white mb-1">Profile Picture</label>
                    <input
                      type="file"
                      className="w-full px-2 py-1.5 border border-gray-600 rounded bg-gray-900 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      placeholder="Your Email"
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">Contact</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      placeholder="Your Contact Number"
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">Address</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      placeholder="Your Address"
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">City</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      placeholder="Your City"
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">Country</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      placeholder="Your Country"
                    />
                  </div>
                </div>

                <button className="px-6 py-2 bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded">
                  Update
                </button>
              </form>

            </div>
          </div>
        )}
      </div>

    </>
  )
}

export default ProfilePage
