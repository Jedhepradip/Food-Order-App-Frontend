import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from "./Redux/Store/Store"
import { Provider } from 'react-redux'
import Navbar from "./Components/Navbar"
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import OrderPage from './Pages/OrderPage'
import AddToCartPage from './Pages/AddToCartPage'

const AppRouter: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/OrderPage' element={<OrderPage />} />
                    <Route path='/ProfilePage' element={<ProfilePage />} />
                    <Route path='/AddToCartPage' element={<AddToCartPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </Provider>
    )
}

export default AppRouter
