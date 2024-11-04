import React from 'react';

const Filtercuisines: React.FC = () => {
    return (
        <div className="bg-black text-white p-4 w-60 h-auto fixed">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-bold">Filter By Cuisines</h1>
                <h2 className="text-sm cursor-pointer underline hover:text-gray-400">Reset</h2>
            </div>
            <div className="flex items-center mb-2">
                <input type="checkbox" id="burger" className="form-checkbox text-purple-600 bg-gray-800 border-gray-700 focus:ring-0" />
                <label htmlFor="burger" className="ml-2 text-sm">Burger</label>
            </div>
            <div className="flex items-center mb-2">
                <input type="checkbox" id="burger" className="form-checkbox text-purple-600 bg-gray-800 border-gray-700 focus:ring-0" />
                <label htmlFor="burger" className="ml-2 text-sm">Burger</label>
            </div>
            <div className="flex items-center mb-2">
                <input type="checkbox" id="burger" className="form-checkbox text-purple-600 bg-gray-800 border-gray-700 focus:ring-0" />
                <label htmlFor="burger" className="ml-2 text-sm">Burger</label>
            </div>
            <div className="flex items-center mb-2">
                <input type="checkbox" id="burger" className="form-checkbox text-purple-600 bg-gray-800 border-gray-700 focus:ring-0" />
                <label htmlFor="burger" className="ml-2 text-sm">Burger</label>
            </div>
            <div className="flex items-center mb-2">
                <input type="checkbox" id="burger" className="form-checkbox text-purple-600 bg-gray-800 border-gray-700 focus:ring-0" />
                <label htmlFor="burger" className="ml-2 text-sm">Burger</label>
            </div>
        </div>
    );
}

export default Filtercuisines;
