import React, { useContext } from 'react'
import SearchBar from '../components/weather/SearchBar'
import WeatherCard from '../components/weather/WeatherCard'
import ForecastCard from '../components/weather/ForecastCard'
import { getCurrentWeather , getForecast } from '../services/weatherApi'
import { WeatherContext } from '../context/WeatherContext'
function Home() {
const {forecast,
    setForecast,
    weather,
    setWeather,
    searchedCity,
    setSearchedCity,
    error,
    setError,
    }=useContext(WeatherContext); 

const handleSearch = async (city) => {
    setError(null)
    try {
        const data = await getCurrentWeather(city);
        const fore = await getForecast(city);
        setWeather(data);
        setForecast(fore);
        setSearchedCity(data.name)
    } catch (error) {
        setError(error.message);
        console.log(error.message);
    }
};

const dailyForecast = [];
let prevDate="";
if(forecast){
    for(let i=0;i<forecast.list.length;i++){
    const item=forecast.list[i];
    const currentDate = item.dt_txt.split(" ")[0];
    if(currentDate!==prevDate){
        const date = new Date(currentDate);
        const day= date.toLocaleDateString("en-us" , {
            weekday:"short"
        });
        dailyForecast.push({
            day:day,
            temperature:item.main.temp,
            condition:item.weather[0].description,
            rain_probability: item.pop*100,
            icon:item.weather[0].icon
        });
        prevDate=currentDate;
    }
    if(dailyForecast.length === 5)
        break;
}
}

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
                {error && <p>{error}</p>}
                {weather && <WeatherCard weather={weather}  />}

                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                {dailyForecast.map((day) => (
                    <ForecastCard
                        key={day.day}
                        day={day.day}
                        temperature={day.temperature}
                        condition={day.condition}
                        rain={day.rain_probability}
                        icon={day.icon}
                    />
                ))}
            </div>
            </section>
        </main>
    )
}

export default Home