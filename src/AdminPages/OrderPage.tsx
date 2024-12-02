import React from 'react'

const OrderPage: React.FC = () => {
    const orders = [
        {
            id: 1,
            menu: {
                img: "https://via.placeholder.com/150",
                name: "Margherita Pizza",
                price: "$12.99",
            },
            status: "Pending",
        },
        {
            id: 2,
            menu: {
                img: "https://via.placeholder.com/150",
                name: "Spaghetti Bolognese",
                price: "$15.99",
            },
            status: "Delivered",
        },
        {
            id: 3,
            menu: {
                img: "https://via.placeholder.com/150",
                name: "Caesar Salad",
                price: "$8.99",
            },
            status: "Preparing",
        },
    ];
    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4">
                <h1 className="text-2xl font-bold text-center mb-6">Order Details</h1>
                <div className="max-w-4xl mx-auto">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex items-center bg-white shadow-md rounded-lg p-4 mb-4"
                        >
                            <img
                                src={order.menu.img}
                                alt={order.menu.name}
                                className="w-20 h-20 rounded-lg mr-4 object-cover"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">{order.menu.name}</h2>
                                <p className="text-gray-600">{order.menu.price}</p>
                            </div>
                            <div>
                                <span
                                    className={`px-3 py-1 text-sm font-medium rounded-full ${order.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : order.status === "Delivered"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-blue-100 text-blue-600"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default OrderPage
