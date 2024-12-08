import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaCity, FaGlobe } from 'react-icons/fa';
import { IoMdCall } from "react-icons/io";
import { RxCross2 } from 'react-icons/rx';
import { useForm, SubmitHandler } from "react-hook-form"
import { UserInterFaceData } from '../interface/UserInterface';
import { FetchingUserData } from '../Redux/Features/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { ProfileUpdateFrom } from '../interface/ProfileUpdateInterface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const [showupdate, setshowupdate] = useState(false)
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [loadingShow, setLoadingShow] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const Dispatch: AppDispatch = useDispatch()
  const { register, handleSubmit } = useForm<ProfileUpdateFrom>();
  const [UserInfo, setUserData] = useState<UserInterFaceData | null>(null);
  const UserData = useSelector((state: RootState) => state.User.User)

  useEffect(() => {
    if (UserData) {
      setUserData(UserData)
    }
  }, [UserData])

  const setshowmodel = () => {
    setLoadingShow(true)
    setTimeout(() => {
      setshowupdate(true)
      setLoadingShow(false)
    }, 1200);
  }

  const ShowToastContainer = () => {
    toast.error(<div className='font-serif text-[15px] text-black'>Email is Not Update...</div>);
  }

  const onsubmit: SubmitHandler<ProfileUpdateFrom> = async (data) => {
    setLoadingOTP(true)
    const formdata = new FormData();
    formdata.append("profilePicture", file!); // Corrected key
    formdata.append("name", data.name);
    formdata.append("contact", data.contact);
    formdata.append("address", data.address);
    formdata.append("city", data.city);
    formdata.append("country", data.country);

    try {
      const response = await axios.post(
        `http://localhost:3000/api-user/Update/User/${UserInfo?._id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      const UserUpdate = response.data;
      if (response.status === 200) {
        toast.success(<div className='font-serif text-[15px] text-black'>{UserUpdate.message}</div>);
        setTimeout(() => {
          setLoadingOTP(false)
          setshowupdate(false)
        }, 1600);
        Dispatch(FetchingUserData())
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        setLoadingOTP(false)
        const errorMessage = error.response.data.message;
        if (error.response.status === 409 || errorMessage === "User already exists") {
          console.log("Error: User already exists.");
          toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
        } else {
          toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
          console.log("Error:", errorMessage || "Unexpected error occurred.");
        }
      } else {
        console.log("Error: Network issue or server not responding", error);
      }
    }
  };

  useEffect(() => {
    Dispatch(FetchingUserData())
  }, [Dispatch])

  // ⚠ 
  return (
    <>
      <div className='max-w-7xl mx-auto p-6 bg-black text-white shadow-md h-screen'>
        <div className='flex items-center mb-6'>
          <img
            src={`http://localhost:3000/${UserInfo?.profilePictuer}`}
            alt="Profile"
            className='h-36 w-36 rounded-full object-cover'
          />
          <h1 className='px-7 py-10 text-3xl font-bold'>{UserInfo?.name}</h1>
        </div>
        <div className='justify-around items-center text-lg grid md:grid-cols-5 grid-cols-2 gap-2'>
          <div className="flex flex-col py-1 px-6 bg-gray-700 relative text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            <div className="flex items-center">
              <FaEnvelope className="text-2xl text-gray-500 mr-2" />
              <span className="font-semibold text-lg tracking-wide text-gray-400">Email</span>
            </div>
            <p className="text-sm font-medium opacity-80 px-8 text-white truncate">
              {UserInfo?.email}
            </p>
          </div>

          <div className="flex flex-col py-1 px-6 bg-gray-700 relative text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            <div className="flex items-center">
              <IoMdCall className="text-2xl text-gray-500 mr-2" />
              <span className="font-semibold text-lg tracking-wide text-gray-400">Contact</span>
            </div>
            <p className="text-sm font-medium opacity-80 px-8 text-white truncate">
              {UserInfo?.contact}
            </p>
          </div>

          <div className="flex flex-col py-1 px-6 bg-gray-700 relative text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-2xl text-gray-500 mr-2" />
              <span className="font-semibold text-lg tracking-wide text-gray-400">Address</span>
            </div>
            <p className="text-sm font-medium opacity-80 px-8 text-white truncate">
              {UserInfo?.address}
            </p>
          </div>

          <div className="flex flex-col py-1 px-6 bg-gray-700 relative text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            <div className="flex items-center">
              <FaCity className="text-2xl text-gray-500 mr-2" />
              <span className="font-semibold text-lg tracking-wide text-gray-400">City</span>
            </div>
            <p className="text-sm font-medium opacity-80 px-8 text-white truncate">
              {UserInfo?.city}
            </p>
          </div>

          <div className="flex flex-col py-1 px-6 bg-gray-700 relative text-white rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            <div className="flex items-center">
              <FaGlobe className="text-2xl text-gray-500 mr-2" />
              <span className="font-semibold text-lg tracking-wide text-gray-400">Country</span>
            </div>
            <p className="text-sm font-medium opacity-80 px-8 text-white truncate">
              {UserInfo?.country}
            </p>
          </div>

        </div>
        <div className='w-full flex justify-center items-center' onClick={() => setshowmodel()}>         
          <button
            // type='submit'
            className={`md:w-[12%] w-[20%] flex justify-center items-center py-1 mt-4 bg-orange-500 font-serif text-black rounded-md hover:bg-orange-700 transition duration-300 text-[20px] ${loadingShow ? 'cursor-not-allowed' : ''} ${loadingShow ? 'animate-pulse' : ''}`}
            disabled={loadingShow}
          >
            {loadingShow && (
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
            <span>{loadingShow ? 'Loading...' : 'Update'}</span>
          </button>
        </div>
      </div>
      <ToastContainer />
      <div className='flex justify-center w-full '>
        {/* grid grid-cols-1 place-items-center fixed inset-0 z-50 bg-black/60 */}
        {showupdate && (
          <div className='fixed inset-0 z-50 bg-black/85 place-items-center grid grid-cols-1'>
            <div className="mt-6 p-6 bg-gray-900 rounded shadow-lg absolute z-50 w-[500px] ">
              <RxCross2 className='float-right text-white text-[23px] cursor-pointer' onClick={() => setshowupdate(false)} />
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mb-4">

                  <div>
                    <label className="block text-[17px] font-medium text-white mb-1">Profile Picture</label>
                    <input {...register("profilePictuer")}
                      type="file"
                      name='profilePictuer'
                      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full px-2 py-1.5 border border-gray-600 rounded bg-gray-900 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">Name</label>
                    <input {...register("name")}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      defaultValue={UserInfo?.name}
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">Email</label>
                    <input {...register("email")}
                      type="email"
                      onClick={() => ShowToastContainer()}
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      value={UserInfo?.email}
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">Contact</label>
                    <input {...register("contact")}
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      defaultValue={UserInfo?.contact}
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">Address</label>
                    <input {...register("address")}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      defaultValue={UserInfo?.address}
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">City</label>
                    <input {...register("city")}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      defaultValue={UserInfo?.city}
                    />
                  </div>

                  <div>
                    <label className="block text-[17px] font-medium text-white md:mb-1">Country</label>
                    <input {...register("country")}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                      defaultValue={UserInfo?.country}
                    />
                  </div>
                </div>
                <div className="w-ful pb-2">
                  <button
                    // type='submit'
                    className={`px-6 py-2 flex bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded font-serif ${loadingOTP ? 'cursor-not-allowed' : ''} ${loadingOTP ? 'animate-pulse' : ''}`}
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
                    <span>{loadingOTP ? 'Loading...' : 'Update'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

    </>
  )
}

export default ProfilePage
