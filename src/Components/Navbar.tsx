import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { FetchingUserData } from '../Redux/Features/UserSlice';

import { FaHome, FaUser } from "react-icons/fa";
import { LuHandPlatter, LuPackageCheck, LuSquareMenu, LuUtensilsCrossed } from "react-icons/lu";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch()
  const User = useSelector((state: RootState) => state.User.User)

  const Navigate = useNavigate()
  useEffect(() => {
    dispatch(FetchingUserData())
  }, [dispatch])

  const handlelogout = () => {
    localStorage.removeItem("Token")
    Navigate("/SigninPage")
  }

  const token = localStorage.getItem("Token")

  return (
    <nav className="bg-black text-white sticky top-0 left-0 z-30">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap cursor-pointer">CraveCourier</span>
        </a>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-controls="navbar-dropdown"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:justify-between md:w-auto`} id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li>
              <NavLink to={"/"} className="cursor-pointer py-2 px-3 text-white flex md:gap-0 gap-2 hover:bg-gray-700 md:p-0" aria-current="page" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <FaHome className='md:hidden' /> Home</NavLink>
            </li>
            {token ?
              <>
                <li>
                  <NavLink to={"/ProfilePage"} className="flex cursor-pointer py-2 px-3 md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0" aria-current="page" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> <FaUser className='md:hidden' /> Profile</NavLink>
                </li>
              </>
              :
              null
            }

            <li>
              <NavLink to={"/OrderPage"} className="cursor-pointer py-2 px-3 flex md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0" aria-current="page" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <LuHandPlatter className='md:hidden' /> Order</NavLink>
            </li>

            <li className='bg-black md:block hidden'>
              <div className="relative inline-block text-left">
                <button
                  id="dropdownDelayButton"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  className="text-white bg-black hover:bg-gray-800 focus:ring-1 font-medium rounded-lg text-[17px] text-center inline-flex items-center"
                  type="button"
                >
                  Dashboard
                  <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                  <div
                    id="dropdownDelay"
                    className="absolute z-50 bg-black divide-y overflow-hidden divide-gray-100 rounded-lg shadow shadow-gray-300 w-28"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <ul className="py-2 text-sm z-50 text-white bg-black" aria-labelledby="dropdownDelayButton">
                      <li>
                        <NavLink to={"/RestaurantPages"} className="block px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Restaurant</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/MenuPages"} className="block px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Menu</NavLink>
                      </li>
                      <li>
                        <NavLink to={"/OrderPageAdmin"} className="block px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Order</NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>

            <li className='bg-black md:hidden'>
              <li>
                <NavLink to={"/RestaurantPages"} className="cursor-pointer py-2 px-3 flex md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> <LuUtensilsCrossed className='md:hidden' /> Restaurant</NavLink>
              </li>
              <li>
                <NavLink to={"/MenuPages"} className="cursor-pointer py-2 px-3 flex md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> <LuSquareMenu className="md:hidden" /> Menu</NavLink>
              </li>
              <li>
                <NavLink to={"/OrderPageAdmin"} className="cursor-pointer py-2 px-3 flex md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> <LuPackageCheck className="md:hidden" /> Order</NavLink>
              </li>
            </li>

            {token ? <>
              <li className="relative md:block hidden">
                <NavLink
                  to={"/AddToCartPage"}
                  className="block cursor-pointer py-2 px-3 text-[25px] text-white hover:bg-gray-700 md:p-0"
                  aria-current="page"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <FiShoppingCart />
                </NavLink>
                {User?.items?.length && (
                  <div className="absolute md:-top-2 md:-right-2 top-0 md:left-4 left-7 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {User?.items.length}
                  </div>
                )}
              </li>


              <li className="relative block md:hidden">
                <NavLink
                  to={"/AddToCartPage"}
                  className="cursor-pointer py-1 px-3 mb-2 flex md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0"
                  aria-current="page"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <FiShoppingCart /> Cart({User?.items.length})
                </NavLink>
              </li>


              <li className='bg-black md:block hidden'>
                <div className='rounded-full cursor-pointer overflow-hidden md:ml-0 ml-2.5'>
                  <img src={`http://localhost:3000/${User?.profilePictuer}`} alt="" className='h-8 w-8 rounded-full object-cover' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                </div>
              </li>
              <li className='bg-black block md:hidden'>
                <div className='rounded-full cursor-pointer gap-2 flex overflow-hidden md:ml-0 ml-2.5'>
                  <img src={`http://localhost:3000/${User?.profilePictuer}`} alt="" className='h-8 w-8 rounded-full object-cover' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                  <span className='mt-1'>{User?.name}</span>
                </div>
              </li>
            </>
              :
              null
            }

            {/* <div className="flex space-x-4 mt-0 md:mt-0 md:px-6 px-0 ">
              {token ?
                <>
                  <button
                    onClick={() => {
                      handlelogout();
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                    className=" px-4 cursor-pointer font-semibold text-white bg-orange-500 rounded shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-300 ease-in-out text-center block">
                    Logout
                  </button>

                  <span onClick={() => {
                    handlelogout(); setIsMobileMenuOpen(!isMobileMenuOpen)
                  }}
                    className="py-2 cursor-pointer px-4 shadow-lg font-bold bg-orange-500 text-center shadow-gray-600 text-black rounded hover:bg-orange-600 block md:hidden w-[25%]">Logout</span>
                </>
                :
                <>
                  <NavLink to={"/LoginPage"} className="py-2 cursor-pointer px-4 shadow-lg shadow-gray-600 text-white rounded hover:bg-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Login</NavLink>
                  <NavLink to={"/SigninPage"} className="py-2 cursor-pointer px-4 shadow-lg shadow-gray-600 text-white rounded hover:bg-blue-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Signup</NavLink>
                </>
              }
            </div> */}

            <div className="button-container space-y-4">
              {token ? <>
                <span
                  onClick={() => {
                    handlelogout();
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                  }}
                  className="px-4 py-1.5 font-serif md:block hidden cursor-pointer font-medium text-white bg-orange-500 rounded shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-300 ease-in-out text-center"
                >
                  Logout
                </span>

                <span
                  onClick={() => {
                    handlelogout();
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                  }}
                  className="px-4 py-1.5 font-serif w-[38%] block md:hidden cursor-pointer font-medium text-white bg-orange-500 rounded shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-300 ease-in-out text-center"
                >
                  Logout
                </span>
              </>
                :
                <>
                  <div className='w-full md:mt-1 mt-5'>
                    <NavLink
                      to={"/LoginPage"}
                      className="px-4 py-1.5 mr-5 gap-2 font-serif w-[45%] cursor-pointer font-medium text-white bg-black border rounded shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-300 ease-in-out text-center"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      Login
                    </NavLink>

                    <NavLink
                      to={"/SigninPage"}
                      className="px-4 py-1.5 gap-2 mr-0 font-serif w-[55%] cursor-pointer font-medium text-white bg-black border rounded shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-300 ease-in-out text-center"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      Signup
                    </NavLink>

                  </div>
                </>
              }

            </div>

          </ul>
        </div>
      </div>
    </nav >
  );
};

{/* <div className="md:hidden lg:hidden">
  ]
          <MobileNavbar />
        </div> */}

export default Navbar;
