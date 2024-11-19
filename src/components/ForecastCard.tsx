import React from 'react';
import { Cloud, Sun } from 'lucide-react';

interface ForecastCardProps {
  date: string;
  temp: number;
  condition: string;
  icon: string;
}

export default function ForecastCard({ date, temp, condition, icon }: ForecastCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-gray-600 mb-2">{date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt={condition}
        className="w-12 h-12 mx-auto"
      />
      <p className="text-xl font-bold text-gray-800 text-center">{Math.round(temp)}°C</p>
      <p className="text-sm text-gray-600 text-center capitalize">{condition}</p>
    </div>
  );
}