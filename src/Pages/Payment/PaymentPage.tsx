// // import React, { useState } from 'react'
// // import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const PaymentPage: React.FC = ({ SelectMenu, closePaymentModal }) => {

// //     const stripe = useStripe();
// //     const elements = useElements();
// //     const [loading, setLoading] = useState(false);
// //     const [userName, setUserName] = useState("");
// //     const [userEmail, setUserEmail] = useState("");
// //     const navigate = useNavigate();


// //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     const handlePayment = async (event: any) => {
// //         event.preventDefault();
// //         if (!stripe || !elements) return;
// //         setLoading(true);

// //         try {
// //             const Token = localStorage.getItem("Token");
// //             // Check if the token exists, if not redirect to login page
// //             if (!Token) {
// //                 toast.error('You need to log in first.');
// //                 return navigate("/login");
// //             }

// //             // Initiating API call to create payment intent

// //             const { data } = await axios.post('https://hotel-management-server-1-n9cs.onrender.com/Payment/api/create-payment-intent', {
// //                 // const { data } = await axios.post('http://localhost:3000/Payment/api/create-payment-intent', {
// //                 // amount: Number(selectedProduct.price),
// //                 // RoomsId: selectedProduct._id,
// //                 userName, // Ensure userName is available
// //                 userEmail, // Ensure userEmail is available
// //             }, {
// //                 headers: {
// //                     Authorization: `Bearer ${Token}`,
// //                 },
// //             });

// //             const clientSecret = data.clientSecret;
// //             if (!clientSecret) {
// //                 throw new Error("Failed to retrieve payment intent.");
// //             }

// //             // Confirming the payment
// //             const result = await stripe.confirmCardPayment(clientSecret, {
// //                 payment_method: {
// //                     card: elements.getElement(CardElement),
// //                     billing_details: {
// //                         name: userName,
// //                         email: userEmail,
// //                     },
// //                 },
// //             });

// //             if (result.error) {
// //                 console.error('Payment failed:', result.error.message);
// //                 toast.error(result.error.message);
// //                 toast.error(<div className='text-red-600 font-serif'>{result.error.message}</div>);

// //             } else if (result.paymentIntent?.status === 'succeeded') {
// //                 closePaymentModal()
// //                 toast.success(<div className='text-black font-serif'>Payment succeeded!</div>);
// //                 console.log('Payment succeeded:', result.paymentIntent);
// //             } else {
// //                 toast.error(<div className='font-serif text-red-600 '>Payment status is not successful.</div>);
// //             }
// //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //         } catch (error: any) {
// //             // Differentiating error types and messages
// //             if (error.response) {
// //                 console.error('API error:', error.response.data.message);
// //                 toast.error(<div className='font-serif text-red-600 '>{error.response.data.message}</div>);
// //             } else if (error.request) {
// //                 console.error('Network error:', error.request);
// //                 toast.error(<div className='font-serif text-600'>Network error occurred. Please try again.</div>);
// //             } else {
// //                 console.error('General error:', error.message);
// //                 toast.error(<div className='font-serif text-red-600'>{error.message}</div>);
// //             }
// //         } finally {
// //             setLoading(false);
// //             setTimeout(() => {
// //                 closePaymentModal();
// //             }, 2500);
// //         }

// //     };


// //     return (
// //         <>
// //             <ToastContainer />
// //             <div className=" inset-0 bg-gray-800 bg-opacity-75 md:flex md:items-center md:justify-center flex justify-center items-center z-50 absolute md:p-40">
// //                 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg md:p-6 md:w-[55%] w-[80%] p-7 max-w-2xl md:mt-44 relative mb-[2000px]">
// //                     <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white text-center">{SelectMenu}</h2>
// //                     <p className="text-gray-700 dark:text-gray-300 mb-6 text-center ">Price: ₹{SelectMenu}</p>

// //                     <form onSubmit={handlePayment} className="space-y-2">

// //                         <div className="p-2">
// //                             <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-serif">Name:</label>
// //                             <input
// //                                 type="text"
// //                                 id="name"
// //                                 value={userName}
// //                                 onChange={(e) => setUserName(e.target.value)}
// //                                 className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-serif"
// //                                 placeholder="Enter your name"
// //                                 required
// //                             />
// //                         </div>


// //                         <div className="p-2">
// //                             <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-serif">Email:</label>
// //                             <input
// //                                 type="email"
// //                                 id="email"
// //                                 value={userEmail}
// //                                 onChange={(e) => setUserEmail(e.target.value)}
// //                                 className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-serif"
// //                                 placeholder="Enter your email"
// //                                 required
// //                             />
// //                         </div>


// //                         <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
// //                             <CardElement
// //                                 className="p-2"
// //                                 options={{
// //                                     style: {
// //                                         base: {
// //                                             fontSize: '16px',
// //                                             color: '#424770',
// //                                             '::placeholder': {
// //                                                 color: '#aab7c4',
// //                                             },
// //                                         },
// //                                         invalid: {
// //                                             color: '#9e2146',
// //                                         },
// //                                     },
// //                                 }}
// //                             />
// //                         </div>


// //                         <button
// //                             type="submit"
// //                             disabled={loading}
// //                             className={`w-full py-3 px-4 rounded-lg text-white ${loading ? 'bg-blue-500 loading' : 'bg-blue-500 hover:bg-blue-700'} transition duration-300`}
// //                         >
// //                             {loading ? 'Processing...' : `Pay ₹${SelectMenu}`}
// //                         </button>
// //                     </form>

// //                     <button
// //                         onClick={closePaymentModal}
// //                         className="absolute md:top-4 md:right-4 top-2 right-1 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white rounded-full md:px-3 md:py-1 px-2 text-xl transition duration-300"
// //                     >
// //                         &times;
// //                     </button>
// //                 </div>
// //             </div>
// //         </>
// //     )
// // }

// // export default PaymentPage
// import React, { useState } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { ToastContainer, toast } from 'react-toastify';
// import { CartItem } from '../../interface/UserInterface';
// import axios from 'axios';

// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// // Define props interface
// interface PaymentPageProps {
//     SelectMenu: string | number | CartItem[]; // Adjust to match the actual type of UserInfo.items
//     closePaymentModal: () => void;
// }

// const PaymentPage: React.FC<PaymentPageProps> = ({ SelectMenu, closePaymentModal }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);
//     const [userName, setUserName] = useState('');
//     const [userEmail, setUserEmail] = useState('');
//     const navigate = useNavigate();

//     const handlePayment = async (event: React.FormEvent) => {
//         event.preventDefault();
//         if (!stripe || !elements) return;
//         setLoading(true);

//         try {
//             const Token = localStorage.getItem('Token');
//             if (!Token) {
//                 toast.error('You need to log in first.');
//                 return navigate('/login');
//             }

//             const { data } = await axios.post(
//                 'https://hotel-management-server-1-n9cs.onrender.com/Payment/api/create-payment-intent',
//                 {
//                     userName,
//                     userEmail,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${Token}`,
//                     },
//                 }
//             );

//             const clientSecret = data.clientSecret;
//             if (!clientSecret) {
//                 throw new Error('Failed to retrieve payment intent.');
//             }

//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: elements.getElement(CardElement)!,
//                     billing_details: {
//                         name: userName,
//                         email: userEmail,
//                     },
//                 },
//             });

//             if (result.error) {
//                 toast.error(result.error.message);
//             } else if (result.paymentIntent?.status === 'succeeded') {
//                 // closePaymentModal();
//                 toast.success('Payment succeeded!');
//             } else {
//                 toast.error('Payment status is not successful.');
//             }
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (error: any) {
//             if (error.response) {
//                 toast.error(error.response.data.message);
//             } else if (error.request) {
//                 toast.error('Network error occurred. Please try again.');
//             } else {
//                 toast.error(error.message);
//             }
//         } finally {
//             setLoading(false);
//             setTimeout(() => {
//                 // closePaymentModal();
//             }, 2500);
//         }
//     };

//     console.log("SelectMenu :", SelectMenu);


//     return (
//         <>
//             <ToastContainer />
//             <div className="inset-0 bg-gray-800 bg-opacity-75 md:flex md:items-center md:justify-center flex justify-center items-center z-50 absolute md:p-40 w-full h-screen">
//                 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg md:p-6 md:w-[55%] w-[80%] p-7 max-w-2xl md:mt-44 relative">

//                     <form onSubmit={handlePayment} className="space-y-2">
//                         <div className="p-2">
//                             <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-serif">
//                                 Name:
//                             </label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 value={userName}
//                                 onChange={(e) => setUserName(e.target.value)}
//                                 className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-serif"
//                                 placeholder="Enter your name"
//                                 required
//                             />
//                         </div>

//                         <div className="p-2">
//                             <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-serif">
//                                 Email:
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 value={userEmail}
//                                 onChange={(e) => setUserEmail(e.target.value)}
//                                 className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-serif"
//                                 placeholder="Enter your email"
//                                 required
//                             />
//                         </div>

//                         <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
//                             <CardElement
//                                 className="p-2"
//                                 options={{
//                                     style: {
//                                         base: {
//                                             fontSize: '16px',
//                                             color: '#424770',
//                                             '::placeholder': {
//                                                 color: '#aab7c4',
//                                             },
//                                         },
//                                         invalid: {
//                                             color: '#9e2146',
//                                         },
//                                     },
//                                 }}
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className={`w-full py-3 px-4 rounded-lg text-white ${loading ? 'bg-blue-500 loading' : 'bg-blue-500 hover:bg-blue-700'
//                                 } transition duration-300`}
//                         >
//                             {loading ? 'Processing...' : `Pay ₹${SelectMenu}`}
//                         </button>
//                     </form>

//                     <button
//                         onClick={() => closePaymentModal()}
//                         className="absolute md:top-4 md:right-4 top-2 right-1 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white rounded-full md:px-3 md:py-1 px-2 text-xl transition duration-300"
//                     >
//                         &times;
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default PaymentPage;
