import React, { useState, useContext } from 'react';
import { BookingContext } from  '../context/BookingContext';

const BookingForm = () => {
    // Form field state
    const { availableTimes, dispatch, submitForm } = useContext(BookingContext);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState('');

    const [errors, setErrors] = useState({}); // For form validation

    const today = new Date().toISOString().split('T')[0];

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        switch (name) {
            case 'date':
                if (!value) {
                    newErrors.date = 'Please select a date';
                } else if (value < today) {
                    newErrors.date = 'Date cannot be in the past';
                } else {
                    delete newErrors.date;
                }
                break;
            case 'time':
                if (!value) {
                    newErrors.time = 'Please select a time';
                } else {
                    delete newErrors.time;
                }
                break;
            case 'guests':
                if (!value || value < 1) {
                    newErrors.guests = 'At least 1 guest is required';
                } else if (value > 10) {
                    newErrors.guests = 'Maximum 10 guests allowed';
                } else {
                    delete newErrors.guests;
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    
    // handleChage: インプットへの入力の検知,changeの時のみ、メッセージを表示するために使う。
    // submitの時には使わない
    // 各ステートの値をアップデート
    const handleChange = (name, value, setter) => {
        setter(value);
        validateField(name, value);
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        validateField('date', newDate);
        dispatch({ type: 'UPDATE_TIMES', payload: newDate });
    };

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!date) newErrors.date = 'Please select a date';
        if (date < today) newErrors.date = 'Date cannot be in the past';
        if (!time) newErrors.time = 'Please select a time';
        if (!guests || guests < 1) newErrors.guests = 'At least 1 guest is required';
        if (guests > 10) newErrors.guests = 'Maximum 10 guests allowed';

        setErrors(newErrors);
        // invalidな値があった場合、フォーム送信せずに終了
        if (Object.keys(newErrors).length > 0) return;

        const formData = { date, time, guests, occasion};
        submitForm(formData);
    };

    const isFormValid = () => {
        return date && date >= today && time && guests >= 1 && guests <= 10;
    }

    return (
        <form
            className="booking-form"
            onSubmit={handleSubmit}
            role="form"
            aria-label="Table reservation form"
            noValidate // for custom error message
        >
            <div className="form-group">
                <label htmlFor="res-date">Choose date</label>
                <input
                    type="date"
                    id="res-date"
                    value={date}
                    onChange={handleDateChange}
                    required
                    min={today}
                    aria-label="Reservation date"
                    aria-invalid={!!errors.date}
                    aria-describedby="res-date-error"
                />
                {errors.date && <p id="res-date-error" className="error">{errors.date}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="res-time">Choose time</label>
                <select
                    id="res-time"
                    value={time}
                    onChange={(e) => handleChange('time', e.target.value, setTime)}
                    required
                    aria-label="Reservation time"
                    aria-invalid={!!errors.time}
                    aria-describedby="res-time-error"
                >
                <option value="">Select a time</option>
                {availableTimes.map((timeOption) => (
                    <option key={timeOption} value={timeOption}>
                        {timeOption}
                    </option>
                ))}
                </select>
                {errors.time && <p id="res-time-error" className="error">{errors.time}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="guests">Number of guests</label>
                <input
                    type="number"
                    id="guests"
                    value={guests}
                    onChange={(e) => handleChange('guests', Number(e.target.value), setGuests)}
                    required
                    min="1"
                    max="10"
                    aria-label="Number of guests"
                    aria-invalid={!!errors.guests}
                    aria-describedby="guests-error"
                />
                {errors.guests && <p id="guests-error" className="error">{errors.guests}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="occasion">Occasion</label>
                <select
                    id="occasion"
                    value={occasion}
                    onChange={(e) => handleChange('occasion', e.target.value, setOccasion)}
                    aria-label="Occasion for reservation"
                >
                    <option value="">Select an occasion</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                </select>
            </div>
                <input
                    type="submit"
                    value="Make Your Reservation"
                    className="cta-button"
                    aria-label="Submit reservation" 
                    disabled={!isFormValid()}
                />
        </form>
    );
};

export default BookingForm;