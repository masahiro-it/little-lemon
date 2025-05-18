import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Menu from './Menu';
import BookingPage from './BookingPage';
import MenuPage from './MenuPage';
import AboutPage from './AboutPage';
import OrderOnlinePage from './OrderOnlinePage';
import LoginPage from './LoginPage';


const Main = () => {
    return (
        <main className="main container" role="main" aria-label="Main content">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <Menu isSpecials={true} />
                        </>
                    }
                />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/order-online" element={<OrderOnlinePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </main>
    );
};

export default Main;