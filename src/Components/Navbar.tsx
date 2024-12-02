import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { FetchingUserData } from '../Redux/Features/UserSlice';

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
              <NavLink to={"/"} className="block cursor-pointer py-2 px-3 text-white hover:bg-gray-700 md:p-0" aria-current="page" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/ProfilePage"} className="block cursor-pointer py-2 px-3 text-white hover:bg-gray-700 md:p-0" aria-current="page" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Profile</NavLink>
            </li>

            <li>
              <NavLink to={"/OrderPage"} className="block cursor-pointer py-2 px-3 text-white hover:bg-gray-700 md:p-0" aria-current="page" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Order</NavLink>
            </li>

            <li className='bg-black'>
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


            {token ? <>

              <li className="relative">
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

              <li>
                <div className='rounded-full cursor-pointer overflow-hidden md:ml-0 ml-2.5'>
                  <img src={`http://localhost:3000/${User?.profilePictuer}`} alt="" className='h-8 w-8 rounded-full object-cover' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                </div>
              </li>
            </>
              :
              null
            }

            <div className="flex space-x-4 mt-4 md:mt-0 md:px-6 px-0 ">
              {token ?
                <>
                  <span onClick={() => {
                    handlelogout(); setIsMobileMenuOpen(!isMobileMenuOpen)
                  }}
                    className="py-2 cursor-pointer px-4 shadow-lg font-bold shadow-gray-600 text-white rounded hover:bg-gray-600">Logout</span>
                </>
                :
                <>
                  <NavLink to={"/LoginPage"} className="py-2 cursor-pointer px-4 shadow-lg shadow-gray-600 text-white rounded hover:bg-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Login</NavLink>
                  <NavLink to={"/SigninPage"} className="py-2 cursor-pointer px-4 shadow-lg shadow-gray-600 text-white rounded hover:bg-blue-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>Signup</NavLink>
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
