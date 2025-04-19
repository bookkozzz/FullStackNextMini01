"use client"

import React, { useState } from "react"

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<any>(null)
  const [forecastData, setForecastData] = useState<any>(null)
  const [city, setCity] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const API_KEY = "df6441511e2c962d15b26ec28959a778"

  async function fetchWeather() {
    if (!city) return

    setLoading(true)
    setError(null)

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
      ]);

      const [weatherData, forecastData] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json()
      ]);

      if (weatherResponse.ok && forecastResponse.ok) {
        setWeatherData(weatherData)
        setForecastData(forecastData)
      } else {
        setError(weatherData.message || forecastData.message || "Something went wrong")
      }
    } catch (err) {
      setError("Error fetching data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Weather Forecast</h1>
          <p className="text-center text-gray-600 mb-6">Get current weather and forecasts for any city</p>
          
          <div className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
            <input
              className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
            />
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              onClick={fetchWeather}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : 'Get Weather'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Main Content */}
        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Weather */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{weatherData.name}</h2>
                <span className="text-sm text-gray-600">
                  {new Date(weatherData.dt * 1000).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <div className="flex items-center justify-center my-6">
                <div className="text-center">
                  <img 
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} 
                    alt={weatherData.weather[0].description}
                    className="w-32 h-32 mx-auto"
                  />
                  <p className="text-xl capitalize text-gray-700">{weatherData.weather[0].description}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-5xl font-bold text-gray-800 mb-2">{Math.round(weatherData.main.temp)}°C</p>
                <p className="text-gray-600">Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50/50 p-3 rounded-lg">
                  <p className="text-gray-600">Humidity</p>
                  <p className="text-xl font-semibold">{weatherData.main.humidity}%</p>
                </div>
                <div className="bg-blue-50/50 p-3 rounded-lg">
                  <p className="text-gray-600">Wind</p>
                  <p className="text-xl font-semibold">{weatherData.wind.speed} m/s</p>
                </div>
                <div className="bg-blue-50/50 p-3 rounded-lg">
                  <p className="text-gray-600">Pressure</p>
                  <p className="text-xl font-semibold">{weatherData.main.pressure} hPa</p>
                </div>
                <div className="bg-blue-50/50 p-3 rounded-lg">
                  <p className="text-gray-600">Visibility</p>
                  <p className="text-xl font-semibold">{weatherData.visibility / 1000} km</p>
                </div>
              </div>
            </div>

            {/* Forecasts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hourly Forecast */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Hourly Forecast</h3>
                <div className="overflow-x-auto">
                  <div className="flex space-x-4 pb-2">
                    {forecastData?.list.slice(0, 12).map((item: any) => (
                      <div key={item.dt} className="flex-shrink-0 bg-blue-50/50 p-4 rounded-lg shadow-sm text-center min-w-[120px]">
                        <p className="font-medium">
                          {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <img 
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
                          alt={item.weather[0].description}
                          className="w-12 h-12 mx-auto my-2"
                        />
                        <p className="text-gray-600 capitalize text-sm">{item.weather[0].description}</p>
                        <p className="text-xl font-semibold mt-1">{Math.round(item.main.temp)}°C</p>
                        <p className="text-xs text-gray-500 mt-1">Humidity: {item.main.humidity}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Daily Forecast */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
                <div className="space-y-3">
                  {forecastData?.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5).map((item: any) => (
                    <div key={item.dt} className="flex items-center justify-between p-3 hover:bg-blue-50/50 rounded-lg transition-colors">
                      <div className="w-32">
                        <p className="font-medium">
                          {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <img 
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
                          alt={item.weather[0].description}
                          className="w-10 h-10"
                        />
                        <span className="ml-2 text-gray-600 capitalize text-sm w-24">
                          {item.weather[0].description}
                        </span>
                      </div>
                      <div className="flex space-x-4">
                        <span className="font-semibold">{Math.round(item.main.temp_max)}°C</span>
                        <span className="text-gray-500">{Math.round(item.main.temp_min)}°C</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}