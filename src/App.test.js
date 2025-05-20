import { render, screen, fireEvent } from '@testing-library/react';
import BookingPage from './components/BookingPage';
import BookingForm from './components/BookingPage';
import { BookingProvider, BookingContext } from './context/BookingContext';


// Test for BookigPage
describe('BookingPage', () => {
  test('Renders the BookingPage heading', () => {
    render(
      <BookingProvider>
        <BookingPage />
      </BookingProvider>
    );
    const headingElement = screen.getByText(/Reserve a Table/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('Renders the description text', () => {
    render(
      <BookingProvider>
        <BookingPage />
      </BookingProvider>
    );
    const descriptionElement = screen.getByText(
      /Book your table at Little Lemon for a delightful Mediterranean dining experience./i
    );
    expect(descriptionElement).toBeInTheDocument();
  });
});

// Test for BookingForm
describe('BookingForm', () => {
  test('Renders form labels', () => {
    render(
      <BookingProvider>
        <BookingForm />
      </BookingProvider>
    );
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
  });

  test('Renders available times in select dropdown', () => {
    render(
      <BookingProvider>
        <BookingForm />
      </BookingProvider>
    );
    const timeSelect = screen.getByLabelText(/Choose time/i);
    expect(timeSelect).toContainElement(screen.getByText('17:00'));
    expect(timeSelect).toContainElement(screen.getByText('18:00'));
  });

  test('Dispatches UPDATE_TIMES action on date change', () => {
    const dispatchMock = jest.fn();
    render(
      <BookingContext.Provider value={{ availableTimes: ['17:00', '18:00'], dispatch: dispatchMock }}>
        <BookingForm />
      </BookingContext.Provider>
    );
    const dateInput = screen.getByLabelText(/Reservation date/i);
    fireEvent.change(dateInput, { target: { value: '2025-05-20' } });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'UPDATE_TIMES',
      payload: '2025-05-20',
    });
  });

  test('Submits form with correct data', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    render(
      <BookingProvider>
        <BookingForm />
      </BookingProvider>
    );
    const dateInput = screen.getByLabelText(/Reservation date/i);
    const timeSelect = screen.getByLabelText(/Reservation time/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    const submitButton = screen.getByLabelText(/Submit reservation/i);

    fireEvent.change(dateInput, { target: { value: '2025-05-20' } });
    fireEvent.change(timeSelect, { target: { value: '17:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });
    fireEvent.click(submitButton);

    expect(consoleLogSpy).toHaveBeenCalledWith('Reservation:', {
      date: '2025-05-20',
      time: '17:00',
      guests: 4,
      occasion: 'Birthday',
    });

    consoleLogSpy.mockRestore();
  });
});


