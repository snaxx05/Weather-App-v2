import React from 'react'
import SearchBar from '../components/common/SearchBar'
import WeatherCard from '../components/common/WeatherCard'
import Forecast from './Forecast'
import { useState } from 'react'
import { getCurrentWeather } from '../services/weatherApi'
function Home() {

const forecast = [
    { day: "Mon", temperature: 30, condition: "Sunny" },
    { day: "Tue", temperature: 28, condition: "Cloudy" },
    { day: "Wed", temperature: 26, condition: "Rain" },
    { day: "Thu", temperature: 31, condition: "Sunny" },
    { day: "Fri", temperature: 29, condition: "Cloudy" }
]
const [weather,setWeather]=useState(null)
const [searchedCity,setSearchedCity]=useState("");    
const handleSearch = async (city) => {
    try {
        const data = await getCurrentWeather(city);
        setWeather(data);
        setSearchedCity(data.name)
    } catch (error) {
        console.log(error.message);
    }
};

    return (
        <main>
            <section className="text-center py-16 px-4">
                <h1 className="text-4xl font-bold text-gray-800">
                    Weather at a glance
                </h1>

                <p className="mt-4 text-gray-600">
                    Search for a city to see its current weather.
                </p>

                <div className="mt-8 flex justify-center">
                    <SearchBar  onSearch = {handleSearch}/>
                </div>
                <p>You temporarily serach : {searchedCity}</p>
                {weather && <WeatherCard weather={weather}  />}

                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                {forecast.map((day)=>(
                    <Forecast 
                    key={day.day}
                    day={day.day}
                    temperature={day.temperature}
                    condition={day.condition}/>
                ))}
            </div>
            </section>
        </main>
    )
}

export default Home