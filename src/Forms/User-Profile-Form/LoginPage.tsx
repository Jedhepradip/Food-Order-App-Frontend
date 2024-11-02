import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface InputFormLogin {
  email: string,
  password: string,
  role: string,
}

const Login: React.FC = () => {
  const [loadingOTP, setLoadingOTP] = useState(false);
  const { register, handleSubmit } = useForm<InputFormLogin>();

  const onsubmit: SubmitHandler<InputFormLogin> = async (data) => {
    console.log(data);
    setLoadingOTP(true);
  }

  return (
    <>
      <div className='grid grid-cols-1 place-items-center p-5 bg-black text-white min-h-screen animate-fadeIn'>
        <ToastContainer />
        <div className='px-5 py-5 shadow-[4px_4px_8px_rgba(255,255,255,0.5)] bg-gray-900 rounded-lg w-80 animate-zoomIn'>
          <h1 className='text-center font-medium font-serif text-[30px] animate-slideIn'>Login</h1>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className='space-y-1 font-serif'>

              <div>
                <label className='block text-lg font-medium'>Email</label>
                <input {...register("email")}
                  type="text"
                  name='email'
                  placeholder='PradipJedhe@gmail.com'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-white outline-none focus:border-transparent text-black'
                />
              </div>

              <div>
                <label className='block text-lg font-medium'>Password</label>
                <input {...register("password")}
                  type="password"
                  name='password'
                  placeholder='password'
                  className='w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-white focus:border-transparent outline-none text-black'
                />
              </div>

              <div className="w-full flex justify-center items-center pb-2">
                <button
                  type='submit'
                  className={`mt-2 flex justify-center items-center text-white w-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-white font-medium rounded-md text-[20px] px-5 py-2.5 ${loadingOTP ? 'cursor-not-allowed' : ''} ${loadingOTP ? 'animate-pulse' : ''}`}
                  disabled={loadingOTP}
                >
                  {loadingOTP && (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white rounded-full"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  )}
                  <span>{loadingOTP ? 'Loading...' : 'Login'}</span>
                </button>
              </div>
            </div>

            <div className='flex text-white'>
              <NavLink to={"/SignIn"}>
                <h1 className='mt-2 text-[13px] px-1 font-medium'>Create New Account? <span className='text-blue-500 hover:underline'>
                  SignIn</span></h1>
              </NavLink>
              <NavLink to={"/ForgetPassword"}>
                <h1 className='cursor-pointer text-[11px] mt-3 ml-5 hover:underline text-blue-500 font-medium'>Forget Password</h1>
              </NavLink>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.9); }
          to { transform: scale(1); }
        }
        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
        .animate-zoomIn { animation: zoomIn 0.6s ease; }
        .animate-slideIn { animation: slideIn 0.7s ease-in-out; }
      `}</style>
    </>
  )
}

export default Login;
