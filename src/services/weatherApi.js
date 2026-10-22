const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getCurrentWeather = async (city) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    console.log("Status:", response.status);
    console.log("Response URL:", response.url);

    if (!response.ok) {
        if(response.status===404){
            throw new Error("City not found.Try another city");
        }else if(response.status===401){
            throw new Error("Weather service configuration error.");
        }else if(response.status===429){
            throw new Error("Too many requests. Try again shortly.");
        }else{
            throw new Error("Couldn't retrieve weather data.");
        }
    }
    const data = await response.json();
    console.log("Returned location:", data.name);
    console.log("Coordinates:", data.coord);
    return data;
    return response.json();
};

export const getForecast = async (city) =>{
    const response= await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if(!response.ok){
         if(response.status===404){
            throw new Error("City not found . Try another city");
        }else if(response.status===401){
            throw new Error("Weather service configuration error.");
        }else if(response.status===429){
            throw new Error("Too many requests . Try again shortly.");
        }else{
            throw new Error("Couldn't retrieve weather data.");
        }
    }

    return response.json();
};