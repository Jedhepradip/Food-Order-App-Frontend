import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { menucreateInterface } from '../interface/MenucreateInterface'
import { RxCross2 } from 'react-icons/rx'
import { SubmitHandler } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const MenuPages: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [showupdate, setshowupdate] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<menucreateInterface>();

    const setshowmodel = () => {
        setshowupdate(true)
    }

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
                    setshowupdate(false)
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
    };
    return (
        <>
            <div className='w-full bg-black text-white h-screen py-10'>
                <ToastContainer />
                <div className='flex justify-around items-center w-full'>
                    <h1 className='font-bold text-white text-2xl'>Available Menus</h1>
                    <button onClick={() => setshowmodel()} className='btn bg-orange-400 text-black font-bold rounded-lg px-5 py-1.5'>Add Menu</button>
                </div>
            </div>

            <div className='flex justify-center w-full '>
                {/* grid grid-cols-1 place-items-center fixed inset-0 z-50 bg-black/60 */}
                {showupdate && (
                    <div className='fixed inset-0 z-50 bg-black/85 place-items-center grid grid-cols-1'>
                        <div className="mt-6 p-6 bg-gray-900 rounded shadow-lg absolute z-50 w-[500px] ">
                            <RxCross2 className='float-right text-white text-[23px] cursor-pointer' onClick={() => setshowupdate(false)} />
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

                                <button className="px-6 py-2 font-bold bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default MenuPages
