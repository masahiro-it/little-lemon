import { createContext, useReducer } from 'react';

// Create BookingContext
export const BookingContext = createContext();

// Initial state(call fetchAPI using today's date)
export const initializeTimes = () => {
    const today = new Date();
    return window.fetchAPI(today); // ['17:00', '18:30', ...]
};



// Reducer(call fetchAPI using selected date)
export const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            const selectedDate = new Date(action.payload); // '2025-05-19' → Date
            return window.fetchAPI(selectedDate); // return new available time
        default:
            return state;
    }
};

// BookingProvider component
export const BookingProvider = ({ children }) => {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
    return (
        <BookingContext.Provider value={{ availableTimes, dispatch }}>
            {children}
        </BookingContext.Provider>
    );
};
