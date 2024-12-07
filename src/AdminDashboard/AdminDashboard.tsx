import React, { useState, useEffect } from "react";
import { FaUsers, FaUtensils, FaClipboardList, FaEdit, FaTrashAlt } from "react-icons/fa";
// import { menucreateInterface } from "../interface/MenucreateInterface";
import { FetchingUserAllRestaurant } from "../Redux/Features/RestaurantAllSlice";
import { FetchingAllUserData } from "../Redux/Features/AllUserDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/Store/Store";
import { RestaurantInterface } from "../interface/RestaurantInterface";
import { FetchinMenuAlldata } from "../Redux/Features/AllMenuSlice";
// import { UserInterFaceData } from "../interface/UserInterface";

export interface UserInterFaceData {
    profilePictuer: string;  //profilePicture
    name: string;
    email: string;
    contact: string;
    password: string;
    address: string;
    country: string;
    city: string;
    updatedAt: string;
    items: []; // Array of individual CartItem objects
    __v: string;
    _id: string;
}

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
interface menucreateInterface {
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

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState("users");
    const dispatch: AppDispatch = useDispatch()
    const [UserInfo, setUserData] = useState<UserInterFaceData[] | null>(null);
    const [AllRestaurant, setAllRestauran] = useState<RestaurantInterface[] | undefined | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<menucreateInterface[] | undefined>(undefined);
    const RestureantdataAll = useSelector((state: RootState) => state.AllRestaurant.RestaurantAll)
    const menuall = useSelector((state: RootState) => state.MenuAll.MenuAllData)
    const userAll = useSelector((state: RootState) => state.AllUser.AllUser)

    useEffect(() => {
        if (RestureantdataAll) {
            setAllRestauran(RestureantdataAll)
        }
        if (userAll) {
            setUserData(userAll)
        }
        if (menuall) {
            setSelectedProduct(menuall)
        }
    }, [RestureantdataAll, menuall, userAll])

    useEffect(() => {
        dispatch(FetchinMenuAlldata())
        dispatch(FetchingAllUserData())
        dispatch(FetchingUserAllRestaurant())
    }, [dispatch])

    console.log(selectedProduct);


    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-950 text-white p-6">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                <nav className="space-y-4">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center gap-2 p-3 w-full rounded-md ${activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-800"
                            }`}
                    >
                        <FaUsers />
                        <span>Users</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("restaurants")}
                        className={`flex items-center gap-2 p-3 w-full rounded-md ${activeTab === "restaurants" ? "bg-gray-700" : "hover:bg-gray-800"
                            }`}
                    >
                        <FaUtensils />
                        <span>Restaurants</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("menus")}
                        className={`flex items-center gap-2 p-3 w-full rounded-md ${activeTab === "menus" ? "bg-gray-700" : "hover:bg-gray-800"
                            }`}
                    >
                        <FaClipboardList />
                        <span>Menus</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-950 border shadow-md rounded-lg p-6">
                        <h2 className="text-lg font-semibold">Total Users</h2>
                        <p className="text-2xl font-bold">{UserInfo?.length}</p>
                    </div>
                    <div className="bg-gray-950 shadow-md rounded-lg border p-6">
                        <h2 className="text-lg font-semibold">Total Restaurants</h2>
                        <p className="text-2xl font-bold">
                            {AllRestaurant?.length}
                        </p>
                    </div>
                    <div className="bg-gray-950 border shadow-md rounded-lg p-6">
                        <h2 className="text-lg font-semibold">Total Menus</h2>
                        <p className="text-2xl font-bold">
                            {selectedProduct?.length}
                        </p>
                    </div>
                </div>

                {/* Dynamic Content */}
                <div>
                    {activeTab === "users" && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Users</h2>
                            <div className="shadow-md rounded-lg p-4">
                                {/* {AllRestaurantDataShowUI?.map((data) => ( */}
                                <>
                                    {UserInfo?.map((user) => (
                                        <div key={user._id} className="mb-4 border bg-black rounded-lg p-4 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold">{user.name}</h3>
                                                <p>Email :{user.email}</p>
                                                <p >

                                                    {AllRestaurant?.map((valrest) => (
                                                        valrest.user.map((val) => (
                                                            val._id == user._id ? <>
                                                                Restaurants : {valrest.restaurantName}
                                                            </>
                                                                :
                                                                <>
                                                                    {null}
                                                                </>
                                                        ))
                                                    ))}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md">
                                                    <FaEdit />
                                                </button>
                                                <button className="p-2 bg-red-600 hover:bg-red-700 rounded-md">
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                                {/* ))} */}
                            </div>
                        </div>
                    )}
                    {activeTab === "restaurants" && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Restaurants</h2>
                            <div className=" shadow-md rounded-lg p-4">
                                {AllRestaurant?.map((restaurant) => (
                                    <div key={restaurant._id} className="mb-4 bg-black border p-4 rounded-lg flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold">{restaurant.restaurantName}</h3>
                                            {restaurant.user.map((val => (
                                                <p>Owner: {val.name}</p>
                                            )))}
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md">
                                                <FaEdit />
                                            </button>
                                            <button className="p-2 bg-red-600 hover:bg-red-700 rounded-md">
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    )}
                    {activeTab === "menus" && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Menus</h2>
                            <div className="bg-black shadow-md rounded-lg p-4">
                                {selectedProduct?.map((menu) => (
                                    <div key={menu._id} className="mb-4 mt-1 bg-black border p-3 rounded-lg flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold">{menu.name}</h3>
                                            <p>Price: {menu.price}</p>
                                            {
                                                menu.restaurantId.map(data => (
                                                    <p>Restaurant: {data.restaurantName}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md">
                                                <FaEdit />
                                            </button>
                                            <button className="p-2 bg-red-600 hover:bg-red-700 rounded-md">
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
