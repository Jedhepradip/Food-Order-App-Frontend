import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from "./Redux/Store/Store"
import { Provider } from 'react-redux'
import Navbar from "./Components/Navbar"
import Footer from './Components/Footer'
import Home from './Pages/Home'

const AppRouter: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </Provider>
    )
}

export default AppRouter
