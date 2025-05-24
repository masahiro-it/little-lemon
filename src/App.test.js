import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import { BookingContext } from './context/BookingContext';
import Footer from './components/Footer'

// react-router-domをモック（BookingContextのuseNavigate用）
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('BookingForm', () => {
  const mockContext = {
    availableTimes: ['17:00', '18:30'],
    dispatch: jest.fn(),
    submitForm: jest.fn(),
  };

  beforeEach(() => {
    window.fetchAPI = jest.fn().mockReturnValue(['17:00', '18:30']);
    window.submitAPI = jest.fn().mockReturnValue(true);
  });

  test('renders date and time labels', () => {
    render(
      <BookingContext.Provider value={mockContext}>
        <BookingForm />
      </BookingContext.Provider>
    );
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
  });

  test('displays available times in dropdown', () => {
    render(
      <BookingContext.Provider value={mockContext}>
        <BookingForm />
      </BookingContext.Provider>
    );
    const timeSelect = screen.getByLabelText(/Choose time/i);
    expect(timeSelect).toContainElement(screen.getByText('17:00'));
    expect(timeSelect).toContainElement(screen.getByText('18:30'));
  });

  test('dispatches UPDATE_TIMES on date change', () => {
    render(
      <BookingContext.Provider value={mockContext}>
        <BookingForm />
      </BookingContext.Provider>
    );
    const dateInput = screen.getByLabelText(/Reservation date/i);
    fireEvent.change(dateInput, { target: { value: '2025-05-20' } });
    expect(mockContext.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TIMES',
      payload: '2025-05-20',
    });
  });

});

