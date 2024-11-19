import axios from "axios";

const API_KEY = '906ca20060b9228f3807c298fe378bc1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(city: string) {
  return await axios.get(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  ).then(({data}) => data).catch(err => Promise.reject(err));
}

export async function getForecast(city: string) {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Forecast data not available');
  }
  const data = await response.json();
  
  const dailyForecasts = data.list
    .filter((item: any) => item.dt_txt.includes('12:00:00'))
    .slice(0, 5);
    
  return dailyForecasts;
}