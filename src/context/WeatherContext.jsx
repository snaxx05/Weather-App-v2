import { createContext,useState } from "react";

export const WeatherContext= createContext();

export function WeatherProvider({children}){
    const [weather,setWeather] = useState(null);
    const [forecast,setForecast] = useState(null);
    const [searchedCity,setSearchedCity] = useState("");
    const [error, setError] = useState(null);
    const resetWeather = () =>{
        setWeather(null),
        setForecast(null),
        setSearchedCity("")
    }

    return(
        <WeatherContext.Provider 
        value={{
            weather,
            setWeather,
            forecast,
            setForecast,
            searchedCity,
            setSearchedCity,
            error,
            setError,
            resetWeather}}>
            {children}
        </WeatherContext.Provider>
    );
}