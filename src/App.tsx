import React, { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchBar from './components/SearchBar';
import { getCurrentWeather, getForecast } from './utils/api';
import { useMutation } from '@tanstack/react-query';

const DEFAULT_CITY = 'Pune';

function App() {

  const [weather, setWeather] = useState({})
  const [forecast, setForecast] = useState([])

  console.log({weather, forecast})
  
  const { mutate: onGetWeather, isPending, isError } = useMutation({
    mutationFn: getCurrentWeather,
    onSuccess: (data) => {
      setWeather(data)
    }
  })

  const { mutate: onGetForecast } = useMutation({
    mutationFn: getForecast,
    onSuccess: (data) => {
      setForecast(data)
    }
  })

  const onGetDetails = (city: string) => {
    onGetWeather(city)
    onGetForecast(city)
  }

  useEffect(() => {
    onGetDetails(DEFAULT_CITY)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br px-5 from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cloud className="text-blue-500" size={40} />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-bold text-gray-800">
              Weather Dashboard
            </h1>
          </div>
          <SearchBar onSearch={onGetDetails}/>
        </header>

        {isPending && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 mb-4">
            {isError}
          </div>
        )}

        {weather?.name && !isPending && (
          <div className="space-y-8">
            <WeatherCard
              city={weather?.name}
              temp={weather?.main?.temp}
              humidity={weather?.main?.humidity}
              windSpeed={weather?.wind?.speed}
              condition={weather?.weather[0]?.description || ""}
              icon={weather?.weather[0]?.icon}
            />

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {forecast?.map((day, index: number) => (
                  <ForecastCard
                    key={index}
                    date={new Date(day.dt_txt).toLocaleDateString()}
                    temp={day.main.temp}
                    condition={day.weather[0].description}
                    icon={day.weather[0].icon}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;