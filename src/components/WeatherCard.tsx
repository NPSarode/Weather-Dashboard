import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  city: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
}

export default function WeatherCard({ city, temp, humidity, windSpeed, condition, icon }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{city}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={condition}
          className="w-16 h-16"
        />
      </div>
      
      <div className="mb-4">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {Math.round(temp)}°C
        </div>
        <p className="text-gray-600 capitalize">{condition}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" size={20} />
          <span className="text-gray-600">{humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="text-gray-500" size={20} />
          <span className="text-gray-600">{windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
}