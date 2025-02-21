import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { FetchingUserData } from '../Redux/Features/UserSlice';
import { FaHome, FaUser } from "react-icons/fa";
import { LuHandPlatter, LuPackageCheck, LuSquareMenu, LuUtensilsCrossed } from "react-icons/lu";
import AdminDashboard from "../AdminDashboard/AdminDashboard"

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch()
  const User = useSelector((state: RootState) => state.User.User)

  const Navigate = useNavigate()
  useEffect(() => {
    dispatch(FetchingUserData())
  }, [dispatch])

  const handlelogout = () => {
    localStorage.removeItem("Token")
    Navigate("/LoginPage")
  }
  const token = localStorage.getItem("Token")
  const handelgobackhomepage = () => {
    Navigate("/")
  }
  
  return (
    <nav className="bg-black text-white sticky top-0 left-0 z-50">
      {User?.idAdmin === false || User === null ? <>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap cursor-pointer">CraveCourier</span> */}
            <h2 className="text-2xl text-white mb-0 text-center font-serif flex justify-center space-x-1">
              {"CraveCourier".split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-bounce"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: "2s",
                  }}
                >
                  {char}
                </span>
              ))}
            </h2>
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

              {(User?.role === "customer" || User === null) && (
                <>
                  <li>
                    <NavLink to={"/"} className="cursor-pointer py-2 px-3 text-white flex md:gap-0 gap-2 hover:bg-gray-700 md:p-0" aria-current="page" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                      <FaHome className='md:hidden' /> Home</NavLink>
                  </li>
                </>
              )}

              {(User?.role === "customer" || User === null) && (
                <li>
                  <NavLink
                    to={"/OrderPage"}
                    className="cursor-pointer py-2 px-3 flex md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0"
                    aria-current="page"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <LuHandPlatter className="md:hidden" /> Order
                  </NavLink>
                </li>
              )}

              {User?.role === "RestroRecruit" && (
                <>
                  {/* <div className='md:block hidden'> */}
                  <li className='md:block hidden'>
                    <NavLink
                      to="/RestaurantPages"
                      className="block hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Restaurant
                    </NavLink>
                  </li>
                  <li className='md:block hidden'>
                    <NavLink
                      to="/MenuPages"
                      className="block hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Menu
                    </NavLink>
                  </li>
                  <li className='md:block hidden'>
                    <NavLink
                      to="/OrderPageAdmin"
                      className="block hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <h4>Order</h4>
                    </NavLink>
                  </li>
                  {/* </div> */}
                </>
              )}

              {token ?
                <>
                  {(User?.role === "RestroRecruit" || User?.role === "customer") && (
                    <li>
                      <NavLink to={"/ProfilePage"} className="flex cursor-pointer py-2 px-3 md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0" aria-current="page" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> <FaUser className='md:hidden block' /> Profile</NavLink>
                    </li>
                  )}
                </>
                :
                null
              }

              {User?.role === "RestroRecruit" && (
                <>
                  <li className='bg-black md:hidden'>
                    <li>
                      <div className="cursor-pointer py-2 px-3 flex md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0"
                        onClick={() => {
                          setIsMobileMenuOpen(!isMobileMenuOpen);
                        }}
                      > <LuUtensilsCrossed className='md:hidden' />Restaurant</div>
                    </li>
                    <li>
                      <NavLink to={"/MenuPages"} className="cursor-pointer py-2 px-3 flex md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> <LuSquareMenu className="md:hidden" /> Menu</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/OrderPageAdmin"} className="cursor-pointer py-2 px-3 flex md:gap-0 gap-2 text-white hover:bg-gray-700 md:p-0" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> <LuPackageCheck className="md:hidden" />Restaurant Orders</NavLink>
                    </li>
                  </li>
                </>
              )}

              {token ? <>
                {User?.role === "customer" && (
                  <>
                    <li className="relative hidden md:block">
                      <NavLink
                        to="/AddToCartPage"
                        className="block cursor-pointer py-2 px-3 text-[25px] text-white hover:bg-gray-700 transition duration-300 ease-in-out md:p-0"
                        aria-current="page"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}> <FiShoppingCart />
                      </NavLink>
                      {User?.items?.length ? (
                        <div className="absolute flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full 
                    md:-top-2 md:-right-2 top-1 left-6 shadow-md animate-pulse">{User?.items.length}
                        </div>
                      )
                        :
                        null}
                    </li>
                  </>
                )}

                {User?.role === "customer" && (
                  <>
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
                  </>
                )}

                {(User?.role === "RestroRecruit" || User?.role === "customer") && (
                  <>
                    <li className='bg-black md:block hidden'>
                      <div className='rounded-full cursor-pointer overflow-hidden md:ml-0 ml-2.5'>
                        <img src={User?.profilePictuer} alt="" className='h-8 w-8 rounded-full object-cover' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                      </div>
                    </li>

                    <li className='bg-black block md:hidden'>
                      <div className='rounded-full cursor-pointer gap-2 flex overflow-hidden md:ml-0 ml-2.5'>
                        <img src={User?.profilePictuer} alt="" className='h-8 w-8 rounded-full object-cover' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                        <span className='mt-1'>{User?.name}</span>
                      </div>
                    </li>
                  </>
                )}
              </>
                :
                null
              }
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
      </>
        :
        <>
          {User.idAdmin === true ? <>
            <AdminDashboard />
          </>
            :
            <>
              <button onClick={() => handelgobackhomepage()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">

              </button>
            </>
          }
        </>
      }

    </nav >
  );
};

export default Navbar;
