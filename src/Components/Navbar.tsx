import React from 'react';

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="bg-black text-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Foode Order</span>
          </a>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:flex md:items-center md:justify-between md:w-auto" id="navbar-dropdown">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <a href="#" className="block py-2 px-3 text-white hover:bg-gray-700 md:p-0" aria-current="page">Home</a>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:bg-gray-700 md:p-0"
                >
                  Dashboard
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <div id="dropdownNavbar" className="z-10 hidden font-normal bg-black divide-y divide-gray-700 rounded-lg shadow w-44">
                  <ul className="py-2 text-sm text-gray-300" aria-labelledby="dropdownLargeButton">
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-700">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-700">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-700">Earnings</a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Sign out</a>
                  </div>
                </div>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-white hover:bg-gray-700 md:p-0">Profile</a>
              </li>              
            </ul>
            <div className="flex space-x-4 mt-4 md:mt-0 px-10">
              <a href="#" className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600">Login</a>
              <a href="#" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500">Signup</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
