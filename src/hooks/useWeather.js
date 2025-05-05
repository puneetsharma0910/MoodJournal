import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching weather data based on geolocation
 * @returns {Object} Object containing weather data, loading state, and error state
 */
const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        // Error callback
        (err) => {
          console.error('Error getting geolocation:', err);
          setError('Unable to access your location. Please check your browser permissions.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  /**
   * Fetch weather data from OpenWeatherMap API
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   */
  const fetchWeatherData = async (lat, lon) => {
    try {
      // In a real app, API key should be stored in environment variables
      const apiKey = 'YOUR_OPENWEATHER_API_KEY';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again later.');
      setLoading(false);
    }
  };

  return { weather, loading, error };
};

export default useWeather;