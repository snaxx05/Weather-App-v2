import React from 'react'

function Forecast(props) {
  return (
      <div className='rounded-xl bg-white p-4 shadow-md text-center'>
        <h2 className='font-semibold text-gray-800'>{props.day}</h2>
        <h2 className='text-gray-500 mt-2'>{props.condition}</h2>
        <p className='text-2xl font-bold text-gray-800 mt-3'>{props.temperature}°C</p>
      </div>
  )
}

export default Forecast