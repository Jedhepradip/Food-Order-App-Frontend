import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { store } from "./Redux/Store/Store"
import { Provider } from 'react-redux'
import Navbar from "./Components/Navbar"
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import OrderPage from './Pages/OrderPage'
import AddToCartPage from './Pages/AddToCartPage'
import SigninPage from './Forms/User-Profile-Form/SigninPage'
import LoginPage from './Forms/User-Profile-Form/LoginPage'

const AppContent: React.FC = () => {
    const location = useLocation();

    // Define routes where Navbar and Footer should be hidden
    const hideNavbarFooter = location.pathname === '/LoginPage' || location.pathname === '/SigninPage';

    return (
        <>
            {!hideNavbarFooter && <Navbar />}
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/OrderPage' element={<OrderPage />} />
                <Route path='/LoginPage' element={<LoginPage />} />
                <Route path='/SigninPage' element={<SigninPage />} />
                <Route path='/ProfilePage' element={<ProfilePage />} />
                <Route path='/AddToCartPage' element={<AddToCartPage />} />
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
