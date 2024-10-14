// src/components/DateSelector.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateSelector from './DateSelector'; // Adjust the import path if necessary

describe('DateSelector Component', () => {
  test('renders the date picker', () => {
    const mockDateChange = jest.fn();
    render(<DateSelector onDateChange={mockDateChange} />);

    const datePickerElement = screen.getByRole('textbox'); // Find the input box for the date picker
    expect(datePickerElement).toBeInTheDocument();
  });

  test('calls onDateChange with selected date range', () => {
    const mockDateChange = jest.fn();
    render(<DateSelector onDateChange={mockDateChange} />);

    // Open the date picker and select a date range
    const datePickerElement = screen.getByRole('textbox'); // Find the input box for the date picker
    fireEvent.click(datePickerElement);

    // Simulate selecting a start date (for example, January 1, 2024)
    const startDateElement = screen.getByText(/1/i); // Change this to the specific day you want to select
    fireEvent.click(startDateElement);

    // Simulate selecting an end date (for example, January 5, 2024)
    const endDateElement = screen.getByText(/5/i); // Change this to the specific day you want to select
    fireEvent.click(endDateElement);

    expect(mockDateChange).toHaveBeenCalledWith({
      startDate: expect.any(Date), // Ensure it gets called with a Date object
      endDate: expect.any(Date),
    });
  });
});

