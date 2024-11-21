import React, { useEffect, useState } from 'react';
import { TiStopwatch } from "react-icons/ti";
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { useSelector, useDispatch } from 'react-redux';
import { FetchingUserAllRestaurant } from '../Redux/Features/RestaurantAllSlice';
import { FetchingMenuData } from '../Redux/Features/MenuSlice';
// import { menucreateInterface } from '../interface/MenucreateInterface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface menucreateInterface {
    name: string,
    description: string,
    price: string,
    menuPictuer: string
    _id: string
    createdAt: string,
    restaurantId: string,
    __v: string,
    updatedAt: string,
}
interface Restaura {
    _id: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: string;
    cuisines: string[];
    RestaurantBanner: string;
    user: string[];
    menus: menucreateInterface[];
}

const ViewMenuPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [Restaurant, setRestaurant] = useState<Restaura | null>(null);
    const [menus, setMenus] = useState<menucreateInterface[] | null>(null);
    const RestaurantData = useSelector((state: RootState) => state.AllRestaurant.RestaurantAll);
    const MenuAllData = useSelector((state: RootState) => state.Menu.Menu)
    const Navigate = useNavigate()
    const Dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        Dispatch(FetchingUserAllRestaurant());
        Dispatch(FetchingMenuData())
    }, [Dispatch]);

    console.log("RestaurantData :", Restaurant);

    useEffect(() => {
        if (RestaurantData && id) {
            const filteredRestaurant = RestaurantData.find(
                (e) => e._id === id
            ) || null; // Ensure the result is `Restaura | null`
            setRestaurant(filteredRestaurant as Restaura | null);

        }

        if (Restaurant?.menus?.length) {
            setMenus(Restaurant?.menus)
        }

    }, [MenuAllData, Restaurant?.menus, RestaurantData, id]);


    const AddToCartIncreaseQuantity = async (id: string) => {
        const fromdata = new FormData()
        fromdata.append("productId", id)
        try {
            const response = await axios.post(`http://localhost:3000/api-restaurant/AddToCart/Increase/Quantity`, fromdata, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            })
            const AddToCartData = response.data;

            if (response.status === 200) {
                toast.success(<div className='font-serif text-[15px] text-black'>{AddToCartData.message}</div>);
                setTimeout(() => {
                    Navigate("/AddToCartPage")
                }, 1600);
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
    }

    return (
        <div className="bg-black min-h-screen p-6 text-white md:px-32">
            {/* Restaurant Banner */}
            <ToastContainer />
            <div
                className="relative w-full h-64 bg-cover object-cover bg-center rounded-lg shadow-md bg-white overflow-hidden"
                style={{
                    backgroundImage: `url('http://localhost:3000/${Restaurant?.RestaurantBanner}')`
                }}>

                {/* <img src={`http://localhost:3000/${Restaurant?.RestaurantBanner}`} className='object-cover w-full h-full' alt="" /> */}

                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                <h1 className="absolute bottom-4 left-4 text-white text-3xl font-semibold">
                    {Restaurant?.restaurantName}
                </h1>
            </div>

            {/* Restaurant Details */}
            <div className="mt-6 space-y-2">
                <p className='font-semibold text-2xl'>
                    {Restaurant?.restaurantName}
                </p>
                <p className="text-1xl font-semibold"></p>
                {Restaurant?.cuisines.map((val, index) => (
                    <span
                        key={index}
                        className={`px-3 py-0.5 rounded-md m-1 inline-block bg-black border border-gray-300'
                            }`}
                    >
                        {val}
                    </span>

                ))}
                <p className="text-lg text-white font-bold flex gap-1"><TiStopwatch className='mt-1' /> Delivery Time: <span className='text-orange-400'>
                    {Restaurant?.deliveryTime}
                </span></p>
            </div>

            {/* Available Menu */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {Restaurant?.menus.length ? <>
                    {menus?.map((val, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <img
                                src={`http://localhost:3000/${val.menuPictuer}`}
                                alt="Restaurant"
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl text-white">
                                    {val.name}
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    {val.description}
                                </p>
                                <p className="text-orange-400 font-semibold mt-2"><span className='text-white'>Price:</span> {val.price}</p>
                                <button className="bg-orange-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg w-full hover:bg-orange-600 transition duration-300" onClick={() => AddToCartIncreaseQuantity(val._id)}>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </>
                    :
                    null
                }

            </div>
        </div>
    );
};

export default ViewMenuPage;