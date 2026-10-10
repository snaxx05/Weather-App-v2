import { createContext,useState } from "react";

export const WeatherContext= createContext();

export function WeatherProvider({children}){
    const [weather,setWeather] = useState(null);
    const [forecast,setForecast] = useState(null);
    const [serachedCity,setSearchedCity] = useState("");

    return(
        <WeatherContext.Provider 
        value={{
            weather,
            setWeather,
            forecast,
            setForecast,
            serachedCity,
            setSearchedCity}}>
            {children}
        </WeatherContext.Provider>
    );
}