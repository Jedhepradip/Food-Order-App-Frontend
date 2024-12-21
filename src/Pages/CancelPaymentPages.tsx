import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const CancelPaymentPages: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md transform transition-all hover:scale-105">
        <div className="flex justify-center items-center mb-6">
          <FaTimesCircle className="text-red-600 text-5xl" />
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Unfortunately, your payment could not be processed. If you need help, please contact our support team for assistance.
        </p>
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:-translate-y-1"
          onClick={() => window.location.href = '/'}
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default CancelPaymentPages;
