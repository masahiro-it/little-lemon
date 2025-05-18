import React, { useState, useContext } from 'react';
import { BookingContext } from  '../context/BookingContext';

const BookingForm = () => {
    // Form field state
    const { availableTimes, dispatch } = useContext(BookingContext);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState('');

    const handleDateChange = (e) => {
        setDate(e.target.value);
        dispatch({ type: 'UPDATE_TIMES', payload: e.target.value })
    };

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reservation:', { date, time, guests, occasion });
    };

    return (
        <form
            className="booking-form"
            onSubmit={handleSubmit}
            role="form"
            aria-label="Table reservation form"
        >
            <label htmlFor="res-date">Choose date</label>
            <input
                type="date"
                id="res-date"
                value={date}
                onChange={handleDateChange}
                required
                aria-label="Reservation date" 
            />
            <label htmlFor="res-time">Choose time</label>
            <select
                id="res-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                aria-label="Reservation time"
            >
                <option value="">Select a time</option>
                {availableTimes.map((timeOption) => (
                    <option key={timeOption} value={timeOption}>
                        {timeOption}
                    </option>
                ))}
                </select>
                <label htmlFor="guests">Number of guests</label>
                <input
                    type="number"
                    id="guests"
                    placehokder="1"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    required
                    aria-label="Number of guests" 
                />
                <label htmlFor="occasion">Occasion</label>
                <select
                    id="occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    aria-label="Occasion for reservation"
                >
                    <option value="">Select an occasion</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                </select>
                <input
                    type="submit"
                    value="Make Your Reservation"
                    className="cta-button"
                    aria-label="Submit reservation" 
                />
        </form>
    );
};

export default BookingForm;