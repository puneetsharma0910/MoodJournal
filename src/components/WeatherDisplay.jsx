import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';

const WeatherDisplay = ({ onWeatherUpdate }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (!apiKey) {
      setError('Weather API key is not configured. Please check your environment variables.');
      setLoading(false);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude, apiKey);
        },
        err => {
          console.error('Error getting location:', err);
          setError('Unable to access your location. Please check your browser permissions.');
          setLoading(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  const fetchWeather = async (lat, lon, apiKey) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Weather data not available');
      }
      
      const data = await response.json();
      setWeather(data);
      onWeatherUpdate(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err.message || 'Unable to fetch weather data. Try again later.');
      setLoading(false);
    }
  };

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude, import.meta.env.VITE_OPENWEATHER_API_KEY);
        },
        err => {
          console.error('Error getting location:', err);
          setError('Unable to access your location. Please check your browser permissions.');
          setLoading(false);
        }
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-300">Loading weather...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-xl shadow-sm">
        <div className="flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-medium">{error}</p>
            <button 
              onClick={retryFetch}
              className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const { main, weather: weatherConditions, name } = weather;

  return (
    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm">
      <WeatherIcon condition={weatherConditions[0].main} />
      <div className="ml-4">
        <p className="font-medium text-gray-800 dark:text-white">{name}</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(main.temp)}°C</p>
          <p className="ml-2 text-gray-600 dark:text-gray-300">{weatherConditions[0].main}</p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Feels like {Math.round(main.feels_like)}°C • Humidity: {main.humidity}%
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;