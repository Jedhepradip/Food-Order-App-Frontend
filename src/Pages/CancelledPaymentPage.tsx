import React from 'react';

const CancelledPaymentPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. If you have any questions, please contact support.
        </p>
        <button className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
          Go Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default CancelledPaymentPage;
