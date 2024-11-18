/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { menucreateInterface } from '../interface/MenucreateInterface'
import { FetchingMenuData } from '../Redux/Features/MenuSlice';
import { ToastContainer, toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';

const MenuPages: React.FC = () => {
    const [showupdate, setshowupdate] = useState(false)
    const [Menuupdate, setmenuUpdate] = useState(false)
    const [Menu, SetMenu] = useState<menucreateInterface[] | null>(null);

    // const [Menudata, SetMenuData] = useState<menucreateInterface[] | undefined>(undefined);

    const Navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const menudata = useSelector((state: RootState) => state.Menu.Menu)

    const [selectedProduct, setSelectedProduct] = useState<menucreateInterface[] | undefined>(undefined);

    useEffect(() => {
        dispatch(FetchingMenuData())
    }, [dispatch])

    console.log(Menu);

    const token = localStorage.getItem("Token")

    useEffect(() => {
        if (menudata) {
            SetMenu(menudata)
        }
        if (!token) {
            Navigate("/Login")
        }
    }, [Navigate, menudata, token])


    const setshowmodel = () => {
        setshowupdate(true)
    }
    const closeMenuModal = () => {
        setmenuUpdate(false)
        setshowupdate(false)
        setSelectedProduct([])
    }

    const UpdateMenuModelShow = (id: string) => {
        const EdittheMenu = Menu?.filter((e) => e._id == id)
        setSelectedProduct(EdittheMenu)
        setmenuUpdate(true)
    }

    return (
        <>
            <div className='w-full bg-black text-white py-10 h-full'>
                <ToastContainer />
                <div className='flex justify-around items-center w-full mb-4'>
                    <h1 className='font-bold text-white text-2xl'>Available Menus</h1>
                    <button onClick={() => setshowmodel()} className='btn bg-orange-400 text-black font-bold rounded-lg px-5 py-1.5'>Add Menu</button>
                </div>

                {Menu?.map((val, index: React.Key | null | undefined) => (
                    <div key={index} className='flex px-60 text-black w-full overflow-hidden py-3'>
                        <div className='flex bg-gray-800 w-full rounded-lg p-2 justify-center items-center'>
                            <img src={`http://localhost:3000/${val?.menuPictuer}`} alt="" className='rounded-lg h-24 w-24 object-cover' />

                            <div className='py-1 font-semibold px-3 w-full overflow-hidden'>
                                <h1 className='text-gray-950'>{val.name}</h1>
                                <button onClick={() => UpdateMenuModelShow(val._id)} className='btn bg-orange-400 text-black font-semibold rounded-lg px-4 py-1.5 float-right'>Edit</button>
                                <p className='text-gray-600'>
                                    {val.description}
                                </p>
                                <h1 className='text-white'>Price: <span className='text-orange-400'>₹{val.price}</span> </h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showupdate && (
                <AddMenuModel closeMenuModal={closeMenuModal} />
            )}

            {/* Menu Update From */}
            {/* {Menuupdate && (
                <MenuUpdateMode closeMenuModal={closeMenuModal} />
            )} */}

            {Menuupdate && selectedProduct && (
                <MenuUpdateModel selectedProduct={selectedProduct} closeMenuModal={closeMenuModal} />
            )}

        </>
    )
}


//add the menu model
const AddMenuModel = ({ closeMenuModal }: any) => {
    const [file, setFile] = useState<File | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<menucreateInterface>();
    const dispatch: AppDispatch = useDispatch()

    const onsubmit: SubmitHandler<menucreateInterface> = async (data) => {
        const formdata = new FormData();
        formdata.append("menuPictuer", file!); // Corrected key
        formdata.append("name", data.name);
        formdata.append("description", data.description);
        formdata.append("price", data.price);

        try {
            const response = await axios.post(
                `http://localhost:3000/api-Meun/Created/Meun`,
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
                    dispatch(FetchingMenuData())
                }, 1600);
            }
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

    return (
        <>
            <div className='flex justify-center w-full'>
                {/* grid grid-cols-1 place-items-center fixed inset-0 z-50 bg-black/60 */}
                <div className='fixed inset-0 z-50 bg-black/85 place-items-center grid grid-cols-1'>
                    <div className="mt-6 p-6 bg-gray-900 rounded shadow-lg absolute z-50 w-[500px] ">
                        <RxCross2 className='float-right text-white text-[23px] cursor-pointer' onClick={() => closeMenuModal()} />
                        <h1 className='text-white font-bold text-[20px] '>Add a New Menu</h1>
                        <span className='text-gray-500'>create a Menu that will make your restaurant stand out!</span>
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <div className="grid grid-cols-1 md:grid-cols-1 md:gap-3 md:mb-4">
                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Name</label>
                                    <input
                                        {...register("name", { required: "Menu Name is required" })}
                                        type="text"
                                        name='name'
                                        placeholder='Enter Menu Name'
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                    />
                                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Description</label>
                                    <input
                                        {...register("description", { required: "Menu description is required" })}
                                        type="text"
                                        name='description'
                                        placeholder='Enter Menu description'
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                    />
                                    {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Price in (Rupees)</label>
                                    <input
                                        {...register("price", { required: "Menu Price is required" })}
                                        type="number"
                                        name='price'
                                        placeholder='Enter Menu Price'
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                    />
                                    {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white mb-1">MenuPictuer</label>
                                    <input
                                        {...register("menuPictuer", { required: "Menu Pictuer is required" })}
                                        type="file"
                                        name='menuPictuer'
                                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                        className="w-full px-2 py-1.5 border border-gray-600 rounded bg-gray-900 text-white"
                                    />
                                </div>
                                {errors.menuPictuer && <span className="text-red-500 text-sm">{errors.menuPictuer.message}</span>}
                            </div>

                            <button className="px-6 py-2 bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

// menu update 
const MenuUpdateModel = ({ selectedProduct, closeMenuModal }: any) => {
    const [file, setFile] = useState<File | null>(null);
    const { register, handleSubmit } = useForm<menucreateInterface>();
    const dispatch: AppDispatch = useDispatch()

    const token = localStorage.getItem("Token")
    const onsubmit: SubmitHandler<menucreateInterface> = async (data) => {
        const fromdata = new FormData()
        fromdata.append("menuPictuer", file!)
        fromdata.append("name", data.name)
        fromdata.append("description", data.description)
        fromdata.append("price", data.price)

        try {
            const response = await axios.put(`http://localhost:3000/api-Meun/Menu/Update/${selectedProduct[0]?._id}`, fromdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                }
            })

            const Restaurantdata = response.data;
            if (response.status === 200) {
                toast.success(<div className='font-serif text-[15px] text-black'>{Restaurantdata.message}</div>);
                closeMenuModal()
            }
            dispatch(FetchingMenuData())
        } catch (error: any) {
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
        <>
            <div className='flex justify-center w-full '>
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
                                        defaultValue={selectedProduct[0]?.name}
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Description</label>
                                    <input
                                        {...register("description")}
                                        type="text"
                                        name='description'
                                        defaultValue={selectedProduct[0]?.description}
                                        className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                    />

                                </div>

                                <div>
                                    <label className="block text-[17px] font-medium text-white md:mb-1">Price in (Rupees)</label>
                                    <input
                                        {...register("price")}
                                        type="number"
                                        name='price'
                                        defaultValue={selectedProduct[0]?.price}
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

                            <button className="px-6 py-2 bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded font-semibold">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

// AddMenuModel.propTypes = {
//     closeMenuModal: PropTypes.func.isRequired,
// };

export default MenuPages



// e.preventDefault()
// const fromdata = new FormData(e.target)
// fromdata.append("menuPictuer", file!)
// const obj = Object.fromEntries(fromdata.entries())
// console.log(obj);