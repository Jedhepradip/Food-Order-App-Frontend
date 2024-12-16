// import React, { useEffect } from 'react'
// import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
// import HomePage from './Pages/HomePage'
// import Navbar from './Components/Navbar'
// import Footer from './Components/Footer'
// import OrderPage from './Pages/OrderPage'
// import NotFound from './Pages/NotFound'
// import SearchPage from './Pages/SearchPage'
// import ProfilePage from './Pages/ProfilePage'
// import MenuPages from './AdminPages/MenuPages'
// import ViewMenuPage from './Pages/ViewMenuPage'
// import AddToCartPage from './Pages/AddToCartPage'
// import Filtercuisines from './Pages/Filtercuisines'
// import OrderPageAdmin from './AdminPages/OrderPage'
// import RestaurantPages from './AdminPages/RestaurantPages'
// import LoginPage from './Forms/User-Profile-Form/LoginPage'
// import AdminDashboard from './AdminDashboard/AdminDashboard'
// import SigninPage from './Forms/User-Profile-Form/SigninPage'
// import SetNewPassword from './Forms/User-Profile-Form/SetNewPassword'
// import SendLinkEmailPage from './Forms/User-Profile-Form/SendLinkEmailPage'

// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from './Redux/Store/Store'
// import { FetchingUserData } from './Redux/Features/UserSlice'


// const AppContent: React.FC = () => {

//     const user = useSelector((state: RootState) => state.User.User)

//     const dispatch: AppDispatch = useDispatch()
//     // const Navigate = useNavigate()

//     useEffect(() => {
//         dispatch(FetchingUserData())
//     }, [dispatch])


//     const location = useLocation();
//     // Define routes where Navbar and Footer should be hidden
//     const hideNavbarFooter = location.pathname === '/LoginPage' || location.pathname === '/SigninPage' || location.pathname === '/SendLinkEmailPage' || location.pathname === '/SetNewPassword' || location.pathname === "/AdminDashboard";

//     return (
//         <>
//             {!hideNavbarFooter && <Navbar />}
//             <Routes>

//                 {user?.idAdmin === true ? <>
//                     <Route path='/AdminDashboard' element={<AdminDashboard />} />
//                 </>
//                     :
//                     <>
//                         <Route path="*" element={<NotFound />} />
//                         <Route path='/' element={<HomePage />} />
//                         <Route path='/OrderPage' element={<OrderPage />} />
//                         <Route path='/MenuPages' element={<MenuPages />} />
//                         <Route path='/LoginPage' element={<LoginPage />} />
//                         <Route path='/SigninPage' element={<SigninPage />} />
//                         <Route path='/SearchPage' element={<SearchPage />} />
//                         <Route path='/ProfilePage' element={<ProfilePage />} />
//                         <Route path='/AddToCartPage' element={<AddToCartPage />} />

//                         <Route path='/SetNewPassword' element={<SetNewPassword />} />
//                         <Route path='/Filtercuisines' element={<Filtercuisines />} />
//                         <Route path='/ViewMenuPage/:id' element={<ViewMenuPage />} />
//                         <Route path='/OrderPageAdmin' element={<OrderPageAdmin />} />
//                         <Route path='/RestaurantPages' element={<RestaurantPages />} />
//                         <Route path='/SendLinkEmailPage' element={<SendLinkEmailPage />} />
//                     </>
//                 }

//             </Routes>
//             {!hideNavbarFooter && <Footer />}
//         </>
//     );
// };

// const AppRouter: React.FC = () => {
//     return (
//         <Provider store={store}>
//             <BrowserRouter>
//                 <AppContent />
//             </BrowserRouter>
//         </Provider>
//     );
// };

// export default AppRouter;


import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { RootState, AppDispatch, store } from './Redux/Store/Store';
import { FetchingUserData } from './Redux/Features/UserSlice';
import { useNavigate } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import OrderPage from './Pages/OrderPage';
import NotFound from './Pages/NotFound';
import SearchPage from './Pages/SearchPage';
import ProfilePage from './Pages/ProfilePage';
import MenuPages from './AdminPages/MenuPages';
import ViewMenuPage from './Pages/ViewMenuPage';
import AddToCartPage from './Pages/AddToCartPage';
import Filtercuisines from './Pages/Filtercuisines';
import OrderPageAdmin from './AdminPages/OrderPage';
import RestaurantPages from './AdminPages/RestaurantPages';
import LoginPage from './Forms/User-Profile-Form/LoginPage';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import SigninPage from './Forms/User-Profile-Form/SigninPage';
import SetNewPassword from './Forms/User-Profile-Form/SetNewPassword';
import SendLinkEmailPage from './Forms/User-Profile-Form/SendLinkEmailPage';

const AppContent: React.FC = () => {
    const user = useSelector((state: RootState) => state.User.User);
    const dispatch: AppDispatch = useDispatch();
    const Navigate = useNavigate()
    useEffect(() => {
        dispatch(FetchingUserData());
    }, [dispatch]);

    const location = useLocation();
    const hideNavbarFooter =
        location.pathname === '/LoginPage' ||
        location.pathname === '/SigninPage' ||
        location.pathname === '/SendLinkEmailPage' ||
        location.pathname === '/SetNewPassword' ||
        location.pathname === '/AdminDashboard';

    if (user?.idAdmin === false) {
        Navigate("/")
    }

    return (
        <>
            {!hideNavbarFooter && <Navbar />}
            <Routes>
                {user?.idAdmin === true ? (
                    <>
                        <Route path='/AdminDashboard' element={<AdminDashboard />} />
                    </>
                ) : (
                    <>
                        <Route path="*" element={<NotFound />} />
                        <Route path='/' element={<HomePage />} />
                        <Route path='/OrderPage' element={<OrderPage />} />
                        <Route path='/MenuPages' element={<MenuPages />} />
                        <Route path='/LoginPage' element={<LoginPage />} />
                        <Route path='/SigninPage' element={<SigninPage />} />
                        <Route path='/SearchPage' element={<SearchPage />} />
                        <Route path='/ProfilePage' element={<ProfilePage />} />
                        <Route path='/AddToCartPage' element={<AddToCartPage />} />
                        <Route path='/SetNewPassword' element={<SetNewPassword />} />
                        <Route path='/Filtercuisines' element={<Filtercuisines />} />
                        <Route path='/ViewMenuPage/:id' element={<ViewMenuPage />} />
                        <Route path='/OrderPageAdmin' element={<OrderPageAdmin />} />
                        <Route path='/RestaurantPages' element={<RestaurantPages />} />
                        <Route path='/SendLinkEmailPage' element={<SendLinkEmailPage />} />
                    </>
                )}
            </Routes>
            {!hideNavbarFooter && <Footer />}
        </>
    );
};

const AppRouter: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </Provider>
    );
};

export default AppRouter;
