import React, { useReducer }from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Menu from './Menu';
import BookingPage from './BookingPage';
import MenuPage from './MenuPage';
import AboutPage from './AboutPage';
import OrderOnlinePage from './OrderOnlinePage';
import LoginPage from './LoginPage';


const initializeTimes = () => [
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
];

// Reducer
const updateTimes = (state, action) => {
    switch(action.type) {
        case 'UPDATE_TIMES':
            return initializeTimes();
        default:
            return state;
    }
};

const Main = () => {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

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
                <Route 
                    path="/booking" 
                    element={
                        <BookingPage 
                            availableTimes={availableTimes} 
                            dispatch={dispatch}
                />
                    } 
                />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/order-online" element={<OrderOnlinePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </main>
    );
};

export default Main;