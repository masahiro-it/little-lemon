import React from 'react';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

const ConfirmedBooking = () => {
    const { lastReservation } = useContext(BookingContext);
    return (
        <section
            className="confirmed-booking container"
            role="region"
            aria-label="Booking confirmation"
        >
            <div className="confirmation-container">
                <h1>Reservation Confirmed!</h1>
                {lastReservation && (
                    <div className="reservation-details">
                        <p><strong>Date:</strong> {lastReservation.date}</p>
                        <p><strong>Time:</strong> {lastReservation.time}</p>
                        <p><strong>Guests:</strong> {lastReservation.guests}</p>
                        <p><strong>Occasion:</strong> {lastReservation.occasion || 'None'}</p>
                    </div>
                )}
                <p>We look forward to welcoming you!</p>
                <a 
                    href="/"
                    className="cta-button"
                    role="button"
                    aria-label="Return to home page"
                >
                    Back to Home
                </a>
            </div>
        </section>
    );
};

export default ConfirmedBooking;