'use client'

import React, { useEffect, useState } from 'react'
import {
  getWeatherList,
  addWeather,
  updateWeather,
  deleteWeather,
} from '../_actions/weather'

interface WeatherData {
  id: number
  city: string
  description: string
  temp: number
  humidity: number
  wind: number
}

export default function WeatherCrudPage() {
  const [weatherList, setWeatherList] = useState<WeatherData[]>([])
  const [formData, setFormData] = useState<Omit<WeatherData, 'id'>>({
    city: '',
    description: '',
    temp: 0,
    humidity: 0,
    wind: 0,
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  const loadData = async () => {
    const data = await getWeatherList()
    setWeatherList(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'city' || name === 'description' ? value : parseFloat(value),
    })
  }

  const handleAddOrUpdate = async () => {
    if (editingId !== null) {
      await updateWeather(editingId, formData)
      setEditingId(null)
    } else {
      await addWeather(formData)
    }
    setFormData({ city: '', description: '', temp: 0, humidity: 0, wind: 0 })
    loadData()
  }

  const handleEdit = (item: WeatherData) => {
    const { id, ...rest } = item
    setFormData(rest)
    setEditingId(id)
  }

  const handleDelete = async (id: number) => {
    await deleteWeather(id)
    loadData()
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Weather CRUD</h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="city"
            placeholder={formData.city === '' ? "City" : formData.city}
            value={formData.city}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder={formData.description === '' ? "Description" : formData.description}
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="temp"
            placeholder={formData.temp === 0 ? "Temp °C" : `${formData.temp} °C`}
            value={formData.temp === 0 ? '' : formData.temp}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="humidity"
            placeholder={formData.humidity === 0 ? "Humidity %" : `${formData.humidity} %`}
            value={formData.humidity === 0 ? '' : formData.humidity}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="wind"
            placeholder={formData.wind === 0 ? "Wind m/s" : `${formData.wind} m/s`}
            value={formData.wind === 0 ? '' : formData.wind}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        <button
          onClick={handleAddOrUpdate}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {editingId !== null ? 'Update' : 'Add'}
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Saved Weather Data</h2>
          {weatherList.length === 0 ? (
            <p className="text-gray-500">No data</p>
          ) : (
            <ul className="space-y-4">
              {weatherList.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-100 p-4 rounded flex justify-between items-start flex-col sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-lg font-bold">{item.city}</p>
                    <p>{item.description}</p>
                    <p>Temperature: {item.temp}°C</p>
                    <p>Humidity: {item.humidity}%</p>
                    <p>Wind Speed: {item.wind} m/s</p>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-4 space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
