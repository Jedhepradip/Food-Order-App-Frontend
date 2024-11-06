import React from 'react';
import { NavLink } from 'react-router-dom';

const OrderPage: React.FC = () => {

    const order = [
        {
            id: 1,
            image: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg',
            title: 'Product 1',
            price: 49.99,
        },
        {
            id: 2,
            image: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg',
            title: 'Product 2',
            price: 89.99,
        },
        {
            id: 3,
            image: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg',
            title: 'Product 3',
            price: 29.99,
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Order Status: <span className='text-red-500'>pending</span></h2>

                {/* Order Item */}
                {order.map((val, index) => (
                    <div className="flex items-center justify-between mb-4" key={index}>
                        {/* Display order number */}
                        <img src={val.image} alt={val.title} className="w-16 h-16 rounded-lg object-cover" />

                        {/* Align title text to the start */}
                        <div className="ml-4 flex-1">
                            <h3 className="text-lg font-medium text-left">{val.title}</h3>
                        </div>
                        <div>
                            <p className="text-white mt-1">₹ {val.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}

                {/* Continue Shopping Button */}
                <NavLink to={"/AddToCartPage"}>
                    <button
                        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Continue Shopping
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default OrderPage;