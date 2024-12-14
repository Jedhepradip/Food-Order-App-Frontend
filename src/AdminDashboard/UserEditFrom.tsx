import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, SubmitHandler } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { UserInterFaceData } from '../interface/UserInterface';
import { FetchingUserData } from '../Redux/Features/UserSlice';
import { ProfileUpdateFrom } from '../interface/ProfileUpdateInterface';

interface UserEditFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UserID: any;
    closeMenuModal: () => void;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserEditFrom: React.FC<UserEditFormProps> = ({ UserID, closeMenuModal }: any) => {
    const [file, setFile] = useState<File | null>(null);
    const Dispatch: AppDispatch = useDispatch()
    const { register, handleSubmit } = useForm<ProfileUpdateFrom>();
    const [UserInfo, setUserData] = useState<UserInterFaceData[] | null>(null);
    const [User, UserDataShow] = useState<UserInterFaceData[] | []>([]);
    const UserData = useSelector((state: RootState) => state.AllUser.AllUser)

    useEffect(() => {
        if (UserData) {
            setUserData(UserData)
        }
    }, [UserData])

    useEffect(() => {
        if (UserInfo && UserID) {
            const user = UserInfo?.filter((val) => val._id == UserID);
            console.log(user);
            UserDataShow(user); // Set `null` if `user` is undefined
        }
    }, [UserID, UserInfo]);

    const ShowToastContainer = () => {
        toast.error(<div className='font-serif text-[15px] text-black'>Email is Not Update...</div>);
    }

    const onsubmit: SubmitHandler<ProfileUpdateFrom> = async (data) => {
        const formdata = new FormData();
        formdata.append("profilePicture", file!); // Corrected key
        formdata.append("name", data.name);
        formdata.append("contact", data.contact);
        formdata.append("address", data.address);
        formdata.append("city", data.city);
        formdata.append("country", data.country);

        try {
            const response = await axios.post(
                `http://localhost:3000/api-user/Update/User/${UserID}`,
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
                    closeMenuModal()
                }, 1600);
                Dispatch(FetchingUserData())
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
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

    return (
        <div>
            <div className='flex justify-center w-full '>
                <ToastContainer />
                {/* grid grid-cols-1 place-items-center fixed inset-0 z-50 bg-black/60 */}
                <div className='fixed inset-0 z-50 place-items-center grid grid-cols-1'>
                    <div className="mt-6 p-6 bg-gray-950 inset-0 border rounded shadow-lg z-50 w-[500px] ">
                        <RxCross2 className='float-right text-white text-[23px] cursor-pointer' onClick={() => closeMenuModal()}
                        />
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
                                        defaultValue={User[0]?.name}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Email</label>
                                    <input {...register("email")}
                                        type="email"
                                        onClick={() => ShowToastContainer()}
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                        value={User[0]?.email}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Contact</label>
                                    <input {...register("contact")}
                                        type="tel"
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                        defaultValue={User[0]?.contact}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Address</label>
                                    <input {...register("address")}
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                        defaultValue={User[0]?.address}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">City</label>
                                    <input {...register("city")}
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                        defaultValue={User[0]?.city}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Country</label>
                                    <input {...register("country")}
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                        defaultValue={User[0]?.country}
                                    />
                                </div>
                            </div>

                            <button className="px-6 py-2 bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded font-serif">
                                Update
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserEditFrom
