import React, { useState } from 'react';
import {  FaMinus, FaPlus } from 'react-icons/fa';

const AddToCartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', price: 25, quantity: 2, img: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg' },
        { id: 2, name: 'Product 2', price: 15, quantity: 1, img: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg' },
        { id: 3, name: 'Product 3', price: 30, quantity: 3, img: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg' },
    ]);

    const calculateItemTotal = (price: number, quantity: number) => price * quantity;

    const updateQuantity = (id: number, action: string) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: action === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
                    }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateItemTotal(item.price, item.quantity), 0);
    };

    return (
        <div className="container mx-auto p-4 bg-black text-white min-h-screen">

            <h2 className="text-2xl font-bold mb-1">Shopping Cart</h2>

            <div className="flex justify-end mb-4 px-[150px]">
                <button
                    onClick={clearCart}
                    className="px-4 py-2 font-bold"
                >
                    Clear All
                </button>
            </div>

            <div className="overflow-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Quantity</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td className="p-3">
                                    <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                                </td>
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">${item.price.toFixed(2)}</td>
                                <td className="p-3 flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, 'decrease')}
                                        className="px-1 py-1 bg-gray-400 hover:bg-gray-600 text-white rounded-full"
                                    >
                                        <FaMinus />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 'increase')}
                                        className="px-1 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                                    >
                                        <FaPlus />
                                    </button>
                                </td>
                                <td className="p-3">${calculateItemTotal(item.price, item.quantity).toFixed(2)}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-3 flex justify-between items-center md:pr-[100px] bg-gray-800 text-black">
                <span className="text-lg font-bold text-white px-2 text-[21px]">Total</span>
                <span className="px-4 py-2 font-bold text-[20px] text-white md:mr-12">${calculateTotal().toFixed(2)}</span>
            </div>

            {/* Proceed to Checkout button */}
            <div className="mt-4 flex justify-end md:pr-[100px]">
                <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default AddToCartPage;
