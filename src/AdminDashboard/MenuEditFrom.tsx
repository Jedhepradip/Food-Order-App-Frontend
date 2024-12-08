import React, { useState, useEffect } from 'react'
import { menucreateInterface } from '../interface/MenucreateInterface'
import { FetchinMenuAlldata } from '../Redux/Features/AllMenuSlice';
import { ToastContainer, toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';

interface Restaurant {
    _id: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: string;
    cuisines: string[];
    RestaurantBanner: string;
    user: [];
    menus: string[];
}
interface menucreateInterfaceAll {
    name: string,
    description: string,
    price: string,
    menuPictuer: string
    _id: string
    createdAt: string,
    restaurantId: Restaurant[],
    __v: string,
    updatedAt: string,
}

interface UserMenuProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MenuID: any;
    closeMenuModal: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuEditFrom: React.FC<UserMenuProps> = ({ MenuID, closeMenuModal }: any) => {
    const dispatch: AppDispatch = useDispatch()
    const [file, setFile] = useState<File | null>(null);
    const [loadingOTP, setLoadingOTP] = useState(false);
    const { register, handleSubmit } = useForm<menucreateInterface>();
    const [Menu, SetMenu] = useState<menucreateInterfaceAll[] | null>(null);
    const [FilterMenuData, SetFilterData] = useState<menucreateInterfaceAll[] | null>(null);
    const MenuAllData = useSelector((state: RootState) => state.MenuAll.MenuAllData)

    useEffect(() => {
        if (MenuAllData) {
            SetMenu(MenuAllData)
        }
    }, [MenuAllData])

    useEffect(() => {
        dispatch(FetchinMenuAlldata())
    }, [dispatch])

    useEffect(() => {
        const menudata = Menu?.filter((val) => val._id == MenuID)
        console.log("Rani", menudata);
        SetFilterData(menudata || [])
    }, [Menu, MenuID])

    FilterMenuData?.map(val => console.log("val.name ", val.name));

    const token = localStorage.getItem("Token")
    const onsubmit: SubmitHandler<menucreateInterface> = async (data) => {
        setLoadingOTP(true)
        const fromdata = new FormData()
        fromdata.append("menuPictuer", file!)
        fromdata.append("name", data.name)
        fromdata.append("description", data.description)
        fromdata.append("price", data.price)

        try {
            const response = await axios.put(`http://localhost:3000/api-Meun/Menu/Update/${MenuID}`, fromdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                }
            })

            const Restaurantdata = response.data;
            if (response.status === 200) {
                setInterval(() => {
                    toast.success(<div className='font-serif text-[15px] text-black'>{Restaurantdata.message}</div>);
                    closeMenuModal()
                    setLoadingOTP(false)
                }, 1300);
            }
            setLoadingOTP(true)
            dispatch(FetchinMenuAlldata())
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                setLoadingOTP(true)
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
            <div className='flex justify-center w-full h-screen'>
                <ToastContainer />
                {/* grid grid-cols-1 place-items-center fixed inset-0 z-50 bg-black/60 */}
                <div className='fixed inset-0 z-50 bg-black/85 place-items-center grid grid-cols-1'>
                    <div className="mt-6 p-6 bg-gray-900 rounded shadow-lg absolute z-50 w-[500px] ">
                        <RxCross2 className='float-right text-white text-[23px] cursor-pointer' onClick={() => closeMenuModal()} />
                        <h1 className='text-white font-bold text-[20px] '>Update a Menu</h1>
                        <span className='text-gray-500'>Update a Menu that will make your restaurant stand out!</span>
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <div className="grid grid-cols-1 md:grid-cols-1 md:gap-3 md:mb-4">
                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Name</label>
                                    <input
                                        {...register("name")}
                                        type="text"
                                        name='name'
                                        defaultValue={FilterMenuData?.map(val => val.name)}
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Description</label>
                                    <input
                                        {...register("description")}
                                        type="text"
                                        name='description'
                                        defaultValue={FilterMenuData?.map(val => val.description)}
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                    />

                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Price in (Rupees)</label>
                                    <input
                                        {...register("price")}
                                        type="number"
                                        name='price'
                                        defaultValue={FilterMenuData?.map(val => val.price)}
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white mb-1">MenuPictuer</label>
                                    <input
                                        {...register("menuPictuer")}
                                        type="file"
                                        name='menuPictuer'
                                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                        className="w-full px-2 py-1.5 border border-gray-600 rounded bg-gray-900 text-white"
                                    />
                                </div>
                            </div>

                            {/* <button className="px-6 py-2 bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded font-semibold">
                                Submit
                            </button> */}

                            <div className="w-fu pb-2">
                                <button
                                    type='submit'
                                    className={`
                                btn bg-orange-400 flex hover:bg-orange-500 text-black font-semibold rounded-lg px-7 md:px-4 py-1.5 mt-2 md:mt-0 md:float-right                                                              
                                ${loadingOTP ? 'cursor-not-allowed' : ''} ${loadingOTP ? 'animate-pulse' : ''}`}
                                    disabled={loadingOTP}
                                // mt-2 flex justify-center items-center text-black w-full bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-white rounded-md text-[19px] px-5 py-1.5 
                                >
                                    {loadingOTP && (
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2 text-black rounded-full"
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuEditFrom
