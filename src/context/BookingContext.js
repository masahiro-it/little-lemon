import { createContext, useReducer } from 'react';

// Create BookingContext
export const BookingContext = createContext();

// Initial state
export const initializeTimes = () => [
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
];

// Reducer
export const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return initializeTimes(); // temporary fixed value
        default:
            return state;
    }
}

// BookingProvider component
export const BookingProvider = ({ children }) => {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
    return (
        <BookingContext.Provider value={{ availableTimes, dispatch }}>
            {children}
        </BookingContext.Provider>
    );
};
