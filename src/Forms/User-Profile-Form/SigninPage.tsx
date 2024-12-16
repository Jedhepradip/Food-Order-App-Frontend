import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Signin.css"
import axios from 'axios';

interface InputFormSignIn {
  OTP: string,
  city: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  country: string;
  password: string;
  profilePicture: FileList;
}

const SigninPage: React.FC = () => {
  const [loadingSendOTP, SetloadingSendOTP] = useState(false)
  const [loadingVerifyOTP, SetloadingVerifyOTP] = useState(false)
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState<string>("");
  const [name, setname] = useState<string>("")
  const [contact, setContact] = useState<string>("");
  const [otpSent, setOtpSent] = useState(false); // State to track OTP visibility
  const [otp, setOtp] = useState(''); // State to store the OTP value
  const Navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<InputFormSignIn>();
  //Send OTP Email 

  const [customError, setCustomError] = useState<string | null>(null);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    if (/[A-Z]/.test(emailValue)) {
      setCustomError("Email must not contain uppercase letters.");
    } else {
      setCustomError(null);
    }
    setEmail(emailValue.toLowerCase());
  };


  const handleOtpSubmit = async () => {
    if (!(customError == null)) {
      return
    }
    SetloadingSendOTP(true)
    if (!name) {
      SetloadingSendOTP(false)
      return toast.error(<div className='font-serif text-[15px] text-black'>{"Name are missing.😊"}</div>);
    }
    if (!email) {
      SetloadingSendOTP(false)
      return toast.error(<div className='font-serif text-[15px] text-black'>{"Email are missing.😊"}</div>);
    }

    if (!contact) {
      SetloadingSendOTP(false)
      return toast.error(<div className='font-serif text-[15px] text-black'>{"Contact are missing.😊"}</div>);
    }

    if (!(contact.length >= 10)) {
      SetloadingSendOTP(false)
      return toast.error(<div className='font-serif text-[15px] text-black'>{"Contact must be at least 10 digits"}</div>);
    }


    if (!(contact.length <= 10)) {
      SetloadingSendOTP(false)
      return toast.error(<div className='font-serif text-[15px] text-black'>{"Contact must be exactly 10 digits"}</div>);
    }
    const Formdata = new FormData()
    Formdata.append("email", email)
    Formdata.append("name", name)
    Formdata.append("contact", contact)
    try {
      const response = await axios.post("https://food-order-app-backend-9.onrender.com/api-user/SendOTP/ForRegistration/User", Formdata,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      const OtpResponse = response.data;
      if (response.status === 200) {
        toast.success(<div className='font-serif text-[15px] text-black'>{OtpResponse.message}</div>);
        setTimeout(() => {
          setOtpSent(OtpResponse)
          SetloadingSendOTP(false)
        }, 1600);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        SetloadingSendOTP(false)
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


  const onsubmit: SubmitHandler<InputFormSignIn> = async (data) => {
    SetloadingVerifyOTP(true)
    if (!file) {
      return toast.success(<div className='font-serif text-[15px] text-black'>{"Profile Picture is required.."}</div>);
    }

    if (!(data.OTP === otp)) {
      return toast.error("OTP doesn't match, please try again.")
    }

    const Formdata = new FormData()
    Formdata.append("profilePicture", file)
    Formdata.append("name", data.name)
    Formdata.append("email", data.email)
    Formdata.append("password", data.password)
    Formdata.append("contact", data.contact)
    Formdata.append("address", data.address)
    Formdata.append("country", data.country)
    Formdata.append("city", data.city)
    console.log(Formdata);

    console.log(file);

    try {
      const response = await axios.post("https://food-order-app-backend-9.onrender.com/api-user/Registration/User", Formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      const UserResponse = response.data;
      if (response.status === 200) {
        toast.success(<div className='font-serif text-[15px] text-black'>{UserResponse.message}</div>);
        setTimeout(() => {
          SetloadingVerifyOTP(false)
          Navigate("/");
          // setOtpVerify(false)
          const Token = UserResponse.token;
          localStorage.setItem("Token", Token);
        }, 1600);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setTimeout(() => {
        SetloadingVerifyOTP(false)
      }, 1300);
      if (error.response) {
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
    <div className="flex items-center justify-center p-4 md:h-screen md:px-10 px-2 bg-black text-white">
      <ToastContainer />
      <form onSubmit={handleSubmit(onsubmit)} className="w-full max-w-lg pt-2 border md:border-gray-500 border-gray-100 px-5 pr-5 pb-5 bg-gray-950 rounded-lg shadow-lg animate-fadeIn">
        <h2 className="text-3xl font-serif text-center mb-3">Profile Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-lg font-serif">Name</label>
            <input {...register("name", { required: "Name is required", minLength: { value: 1, message: "Name must be at least 1 character" } })}
              type="text"
              name='name'
              onChange={(e) => setname(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-950 border border-white text-white focus:outline-none font-serif focus:ring-2 focus:ring-purple-500"
              placeholder="name"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>
          {/* <div>
            <label className="block mb-2 text-lg font-serif">Email</label>
            <input
              {...register("email", { required: "Email is required", pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email format" } })}
              type="email"
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-950 border border-white text-white focus:outline-none font-serif focus:ring-2 focus:ring-purple-500"
              placeholder="email"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div> */}

          <div>
            <label className="block mb-2 text-lg font-serif">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              name="email"
              onChange={handleEmailChange}
              className="w-full p-2 rounded-md bg-gray-950 border border-white text-white focus:outline-none font-serif focus:ring-2 focus:ring-purple-500"
              placeholder="email"
            />
            {/* Validation Error */}
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}

            {customError && (
              <span className="text-red-500 text-sm font-serif ">{customError}</span>
            )}
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-lg font-serif">Password</label>
            <input
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              type="password"
              name='password'
              className="w-full p-2 rounded-md bg-gray-950 border border-white text-white focus:outline-none font-serif focus:ring-2 focus:ring-purple-500"
              placeholder="password"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

            <div>
              <label className="block mb-2 text-lg font-serif">Contact</label>
              <input
                {...register("contact", {
                  required: "Contact is required",
                  minLength: { value: 10, message: "Contact must be at least 10 digits" },
                  maxLength: { value: 10, message: "Contact must be exactly 10 digits" },
                })}
                onChange={(e) => setContact(e.target.value)}
                type="tel"
                name='contact'
                className="w-full p-2 rounded-md bg-gray-950 border border-white text-white focus:outline-none font-serif focus:ring-2 focus:ring-purple-500"
                placeholder="contact"
              />
              {errors.contact && <span className="text-red-500 text-sm">{errors.contact.message}</span>}
            </div>

          

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-lg font-serif">City</label>
            <input
              {...register("city", { required: "City is required" })}
              type="text"
              name='city'
              className="w-full p-2 rounded-md bg-gray-950 border border-white text-white focus:outline-none font-serif focus:ring-2 focus:ring-purple-500"
              placeholder="city"
            />
            {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
          </div>
          <div>
            <label className="block mb-2 text-lg font-serif">Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              type="text"
              name='address'
              className="w-full p-2 rounded-md bg-gray-950 border border-white text-white focus:outline-none font-serif focus:ring-2 focus:ring-purple-500"
              placeholder="address"
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-lg font-serif">Country</label>
            <input
              {...register("country", { required: "Country is required" })}
              type="text"
              name='country'
              className="w-full p-2 rounded-md bg-gray-950 border md:border-white border-white text-white focus:outline-none font-serif focus:ring-2 focus:ring-purple-500"
              placeholder="country"
            />
            {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
          </div>
          <div>
            <label className="block mb-2 text-lg font-serif">Profile Picture</label>
            <input
              {...register("profilePicture", { required: "Profile picture is required" })}
              type="file"
              name='profilePicture:'
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="w-full p-1.5 rounded-md bg-gray-950 border md:border-white border-white text-white focus:outline-none font-serif focus:ring-2 focus:ring-purple-500"
            />
            {errors.profilePicture && <span className="text-red-500 text-sm">{errors.profilePicture.message}</span>}
          </div>
        </div>

        {!otpSent && (
          // <button
          //   type="button"
          //   onClick={handleOtpSubmit}
          //   className="w-full py-0.5 mt-2 rounded-md bg-white text-black text-[25px] mb-2 font-serif hover:bg-gray-950 border border-white hover:shadow-[4px_4px_8px_rgba(255,255,255,0.5)] hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          // >
          //   Send OTP
          // </button>
          <button
            type="button"
            onClick={handleOtpSubmit}
            className={`w-full py-2 mt-2 rounded-md bg-orange-600 text-black text-xl font-serif mb-2 transition-transform duration-300 ease-in-out hover:bg-orange-600 hover:shadow-lg hover:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 ${loadingSendOTP ? 'cursor-not-allowed animate-pulse' : ''
              }`}
            disabled={loadingSendOTP}
          >
            {loadingSendOTP ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              <span>Send OTP</span>
            )}
          </button>
        )}

        {otpSent && (
          <div className="mt-1  ">
            <label className="block mb-2 text-lg font-serif">Enter OTP</label>
            <input  {...register("OTP", { required: "OTP is required" })}
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-950 md:border border-white text-white focus:outline-none font-serif focus:ring-2 focus:ring-purple-500"
              placeholder="Enter OTP"
            />

            <button
              type="submit"
              className={`w-full py-2 mt-2 rounded-md bg-orange-600 text-black text-xl font-serif mb-2 transition-transform duration-300 ease-in-out hover:bg-orange-700 hover:shadow-lg hover:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 ${loadingVerifyOTP ? 'cursor-not-allowed animate-pulse' : ''
                }`}
              disabled={loadingVerifyOTP}
            >
              {loadingVerifyOTP ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                <span>Verify OTP</span>
              )}
            </button>
            {/* <button
              type="submit"
              className="w-full py-0.5 mt-2 rounded-md bg-blue-500 text-black text-[25px] mb-2 font-serif hover:bg-blue-700"
            >
              Verify OTP
            </button> */}
          </div>
        )}

        <span className="text-gray-600 hover:text-gray-400 font-serif mt-1 cursor-pointer font-medium">
          already have an account?
          <NavLink to={"/LoginPage"}>
            <span className="text-blue-600 ml-1">Login</span>
          </NavLink>
        </span>
      </form>
    </div>
  );
}

export default SigninPage;