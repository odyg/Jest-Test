import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

const mockWeatherData = {
  main: { temp: 20, humidity: 50 }, 
  weather: [{ main: "Clear", description: "clear", icon: "01d" }], 
  wind: { speed: 5 },
  name: "Test City"
};

test('WeatherCard displays the correct information', () => {
  render(<WeatherCard weather={mockWeatherData} data-testid="weather-card" />); 

  expect(screen.getByText(/Test City/i)).toBeInTheDocument();
  expect(screen.getByText(/20/i)).toBeInTheDocument(); 
  expect(screen.getByText(/clear/i)).toBeInTheDocument(); 
  expect(screen.getByText(/5/i)).toBeInTheDocument(); 
  expect(screen.getByText(/50%/i)).toBeInTheDocument(); 
});
