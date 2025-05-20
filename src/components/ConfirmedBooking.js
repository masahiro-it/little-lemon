import React from 'react';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.svg';

const ConfirmedBooking = () => {
    const { lastReservation } = useContext(BookingContext);
    return (
        <section className="confirmed-booking container" role="region" aria-label="Booking confirmation">
            <div className="confirmation-container">
                <img src={Logo} alt="Little Lemon logo" className="confirmation-logo" />
                <h1 className="fade-in">Reservation Confirmed!</h1>
                <p>We look forward to welcoming you!</p>
                {lastReservation && (
                    <div className="reservation-details slide-in">
                        <p><strong>Date:</strong> {lastReservation.date}</p>
                        <p><strong>Time:</strong> {lastReservation.time}</p>
                        <p><strong>Guests:</strong> {lastReservation.guests}</p>
                        <p><strong>Occasion:</strong> {lastReservation.occasion || 'None'}</p>
                    </div>
                )}
                
                <div className="confirmation-actions">
                    <Link
                        to="/"
                        className="cta-button"
                        role="button"
                        aria-label="Return to home page"
                    >
                        Back to Home
                    </Link>
                    <Link
                        to="/menu"
                        className="cta-button secondary"
                        role="button"
                        aria-label="View menu"
                    >
                        View Menu
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ConfirmedBooking;