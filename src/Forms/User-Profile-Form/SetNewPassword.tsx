import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface InputFormLogin {
    email: string,
    password: string,
    Cpassword: string
}

const SetNewPassword: React.FC = () => {
    const [loadingOTP, setLoadingOTP] = useState(false);
    const { register, handleSubmit } = useForm<InputFormLogin>();
    const Navigate = useNavigate()
    const onsubmit: SubmitHandler<InputFormLogin> = async (data) => {
        setLoadingOTP(true);
        const fromdata = new FormData()
        fromdata.append("email", data.email)
        fromdata.append("password", data.password)
        fromdata.append("Cpassword", data.Cpassword)
        try {
            const response = await axios.post("http://localhost:3000/api-user/User/Password/Reset", fromdata, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const UserResponse = response.data;
            if (response.status === 200) {
                toast.success(<div className='font-serif text-[15px] text-black'>{UserResponse.message}</div>);
                setTimeout(() => {
                    Navigate("/LoginPage");
                    setLoadingOTP(false);
                }, 1600);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                setTimeout(() => {
                    setLoadingOTP(false);
                }, 1600);
                const errorMessage = error.response.data.message;
                if (error.response.status === 409 || errorMessage === "User already exists") {
                    console.log("Error: User already exists.");
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                } else {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                    console.log("Error: ", errorMessage || "Unexpected error occurred.");
                }
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
    }

    return (
        <>
            <div className='grid grid-cols-1 place-items-center p-5 bg-black text-white h-screen animate-fadeIn'>
                <ToastContainer />
                <div className='px-5 py-5 mb-10 shadow-[4px_4px_8px_rgba(255,255,255,0.5)] bg-gray-900 rounded-lg w-80 animate-zoomIn'>
                    <h1 className='text-center font-medium font-serif text-[25px] animate-slideIn'>Create New Password</h1>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className='space-y-1 font-serif'>

                            <div>
                                <label className='block text-lg font-medium'>Email</label>
                                <input {...register("email")}
                                    type="text"
                                    name='email'
                                    placeholder='PradipJedhe@gmail.com'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-white outline-none focus:border-transparent text-black'
                                />
                            </div>

                            <div>
                                <label className='block text-lg font-medium'>Password</label>
                                <input {...register("password")}
                                    type="password"
                                    name='password'
                                    placeholder='password'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-white focus:border-transparent outline-none text-black'
                                />
                            </div>

                            <div>
                                <label className='block text-lg font-medium'>CPassword</label>
                                <input {...register("Cpassword")}
                                    type="password"
                                    name='Cpassword'
                                    placeholder='Cpassword'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-white focus:border-transparent outline-none text-black'
                                />
                            </div>

                            <div className="w-full flex justify-center items-center pb-2">
                                <button
                                    type='submit'
                                    className={`mt-2 flex justify-center items-center text-white w-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-white font-medium rounded-md text-[20px] px-5 py-2 ${loadingOTP ? 'cursor-not-allowed' : ''} ${loadingOTP ? 'animate-pulse' : ''}`}
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
                                    <span>{loadingOTP ? 'Loading...' : 'Submit'}</span>
                                </button>
                            </div>
                        </div>

                        <div className='flex text-white'>
                            <NavLink to={"/SendLinkEmailPage"}>
                                <h1 className='mt-2 text-[12px] px-1 font-medium'><span className='text-blue-500 hover:underline'>Forget Password</span></h1>
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

export default SetNewPassword;
