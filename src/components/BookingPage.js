import React from 'react';
import BookingForm from './BookingForm';

const BookingPage = ({ availableTimes, dispatch }) => {
    return (
        <section className="booking-page container" role="region" arial-label="Table reservation page">
            <div className="booking-container">
                <h1>Reserve a Table</h1>
                <p>Book your table at Little Lemon for a delightful Mediterranean dining experience.</p>
                <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
            </div>
        </section>
    );
};

export default BookingPage;