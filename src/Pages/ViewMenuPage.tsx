import React from 'react';
import { TiStopwatch } from "react-icons/ti";

const ViewMenuPage: React.FC = () => {
    return (
        <div className="bg-black min-h-screen p-6 text-white md:px-32">
            {/* Restaurant Banner */}
            <div
                className="relative w-full h-64 bg-cover bg-center rounded-lg shadow-md overflow-hidden"
                style={{ backgroundImage: `url('https://via.placeholder.com/800x400')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                <h1 className="absolute bottom-4 left-4 text-white text-3xl font-semibold">
                    Restaurant Name
                </h1>
            </div>

            {/* Restaurant Details */}
            <div className="mt-6 space-y-2">
                <p className='font-semibold text-2xl'>Punjabi Junction</p>
                <p className="text-1xl font-semibold">Italian, Mexican, Chinese</p>
                <p className="text-lg text-white font-bold flex gap-1"><TiStopwatch className='mt-1'/> Delivery Time: <span className='text-orange-400'>30mins</span></p>
            </div>

            {/* Available Menu */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="Restaurant"
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white">Restaurant Name</h2>
                            <p className="text-gray-500 mt-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eaque repellat tempora unde cum optio quidem repudiandae!
                            </p>
                            <p className="text-orange-400 font-semibold mt-2"><span className='text-white'>Price:</span> $60</p>
                            <button className="bg-orange-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg w-full hover:bg-orange-600 transition duration-300">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewMenuPage;



// import React, { useState } from 'react';

// // Example interface for a menu item and cart item
// interface MenuItem {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// }

// interface CartItem extends MenuItem {
//   quantity: number;
// }

// const ViewMenuPage: React.FC = () => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // Example menu items
//   const menuItems: MenuItem[] = [
//     {
//       id: 1,
//       name: 'Spaghetti Carbonara',
//       description: 'Rich and creamy pasta with pancetta and Parmesan',
//       price: 12.0,
//       image: 'https://via.placeholder.com/80',
//     },
//     {
//       id: 2,
//       name: 'Margherita Pizza',
//       description: 'Classic pizza with tomato, mozzarella, and basil',
//       price: 10.0,
//       image: 'https://via.placeholder.com/80',
//     },
//   ];

//   // Function to add items to the cart
//   const addToCart = (item: MenuItem) => {
//     setCart((prevCart) => {
//       const itemInCart = prevCart.find((cartItem) => cartItem.id === item.id);
//       if (itemInCart) {
//         return prevCart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }
//       return [...prevCart, { ...item, quantity: 1 }];
//     });
//   };

//   // Function to calculate total price
//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       {/* Restaurant Banner */}
//       <div
//         className="relative w-full h-64 bg-cover bg-center rounded-lg shadow-md"
//         style={{ backgroundImage: `url('https://via.placeholder.com/800x400')` }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
//         <h1 className="absolute bottom-4 left-4 text-white text-3xl font-semibold">
//           Restaurant Name
//         </h1>
//       </div>

//       {/* Restaurant Details */}
//       <div className="mt-6 space-y-2">
//         <p className="text-2xl font-semibold text-gray-800">Cuisine: Italian, Mexican, Chinese</p>
//         <p className="text-lg text-gray-600">Delivery Time: 30-40 mins</p>
//       </div>

//       {/* Available Menu */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Menu</h2>

//         <div className="space-y-4">
//           {menuItems.map((item) => (
//             <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-20 h-20 rounded-lg object-cover"
//               />
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                 <p className="text-gray-600">{item.description}</p>
//                 <p className="text-gray-800 font-bold mt-2">${item.price.toFixed(2)}</p>
//               </div>
//               <button
//                 onClick={() => addToCart(item)}
//                 className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Cart Section */}
//       {cart.length > 0 && (
//         <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart</h2>
//           {cart.map((item) => (
//             <div key={item.id} className="flex items-center justify-between mb-4">
//               <div className="flex items-center space-x-4">
//                 <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                   <p className="text-gray-600">Quantity: {item.quantity}</p>
//                   <p className="text-gray-800 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
//             <span className="text-lg font-semibold text-gray-800">Total:</span>
//             <span className="text-lg font-bold text-gray-800">${calculateTotal()}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewMenuPage;
