
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import TemperatureLegend from './TemperatureLegend'
import { useState } from 'react'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const weatherMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function WeatherMap({ weather }) {
  if (!weather?.coord) {
    return (
      <p className="py-10 text-center text-gray-500">
        Search for a city to view its weather map.
      </p>
    )
  }

  const [selectedLayer, setSelectedLayer] = useState('temp_new')
  const layerOpacity = {
  temp_new: 0.85,
  precipitation_new: 1,
  clouds_new: 0.85,
  wind_new: 1,
}
  const { lat, lon } = weather.coord

  return (
    <div className=" relative overflow-hidden rounded-xl">
       <div className="mb-4 flex flex-wrap gap-2"> 
        {[ { label: 'Temperature', value: 'temp_new' },
           { label: 'Precipitation', value: 'precipitation_new' },
           { label: 'Clouds', value: 'clouds_new' },
           { label: 'Wind', value: 'wind_new' },
         ].map((layer)=>(
            <button 
            key={layer.value}
            onClick={(e)=>setSelectedLayer(layer.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors
                 ${ selectedLayer === layer.value ? 
                    'bg-blue-600 text-white' :
                     'bg-gray-200 text-gray-700 hover:bg-gray-300' }`  
            }>{layer.label}
            </button>
         ))}
        </div>
      <MapContainer
        key={`${lat}-${lon}`}
        center={[lat, lon]}
        zoom={6}
        scrollWheelZoom={true}
        className="h-200 w-full"
      >
        {/* Normal geographical map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Temperature heat overlay */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/${selectedLayer}/{z}/{x}/{y}.png?appid=${import.meta.env.VITE_WEATHER_API_KEY}`}
          opacity={layerOpacity[selectedLayer]}
          attribution="Weather data &copy; OpenWeather"
        />

        <Marker position={[lat, lon]} icon={weatherMarkerIcon}>
          <Popup>
            <div>
                 <strong>{weather.name}</strong>

                     {selectedLayer === 'temp_new' && (
                         <>
                            <p>Temperature: {Math.round(weather.main.temp)}°C</p>
                            <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
                         </>
                     )}

                     {selectedLayer === 'wind_new' && (
                        <p>Wind speed: {weather.wind.speed} m/s</p>
                     )}

                     {selectedLayer === 'precipitation_new' && (
                        <p>
                         Precipitation probability is available in the forecast data.
                        </p>
                     )}

                     {selectedLayer === 'clouds_new' && (
                        <p>Cloud coverage: {weather.clouds.all}%</p>
                     )}
             </div>
           </Popup>
        </Marker>
      </MapContainer>
    <div className="absolute bottom-4 left-4 z-1000">
          <TemperatureLegend selectedLayer={selectedLayer}/>
    </div>
    </div>
  )
}

export default WeatherMap