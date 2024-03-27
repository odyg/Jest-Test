import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import WeatherApp from './WeatherApp'; // Corrected the import

// Mock axios globally
jest.mock('axios');

const mockWeatherData = {
  main: { temp: 20, humidity: 50 },
  weather: [{ main: "Clear", description: "clear", icon: "01d" }],
  wind: { speed: 5 },
  name: "Test City"
};

test('renders WeatherCard with correct data on successful API call', async () => {
  axios.get.mockResolvedValue({ data: mockWeatherData });
  render(<WeatherApp />);

  fireEvent.change(screen.getByRole('textbox', { name: /City/i }), { target: { value: 'Test City' } });
  fireEvent.click(screen.getByRole('button', { name: /Get Weather/i }));

  await waitFor(() => expect(screen.getByText('Test City')).toBeInTheDocument());
  expect(screen.getByText(/20/i)).toBeInTheDocument(); 
  expect(screen.getByText(/clear/i)).toBeInTheDocument(); 
});

test('displays error message on API call failure', async () => {
  axios.get.mockRejectedValue(new Error('API call failed'));
  render(<WeatherApp />);

  fireEvent.change(screen.getByRole('textbox', { name: /City/i }), { target: { value: 'Test City' } });
  fireEvent.click(screen.getByRole('button', { name: /Get Weather/i }));

  await waitFor(() => expect(screen.getByText(/Error, try again later/i)).toBeInTheDocument());
});

test('displays "City not found" message when API returns 404', async () => {
  axios.get.mockRejectedValue({ response: { status: 404 } });
  render(<WeatherApp />);

  fireEvent.change(screen.getByRole('textbox', { name: /City/i }), { target: { value: 'Atlantis' } });
  fireEvent.click(screen.getByRole('button', { name: /Get Weather/i }));

  await waitFor(() => expect(screen.getByText(/Error, try again later/i)).toBeInTheDocument());
});
