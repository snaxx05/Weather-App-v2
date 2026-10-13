import WeatherMap from '../components/weather/WeatherMap'
import { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'
function Explore() {
  const {weather} = useContext(WeatherContext)
  return (
    <WeatherMap weather = {weather}/>
  )
}

export default Explore