import React from 'react'

function WeatherCard() {
    return (
        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Bhubaneswar
                </h2>

                <p className="mt-2 text-gray-500">
                    Partly Cloudy
                </p>

                <div className="my-6 text-6xl font-bold text-gray-800">
                    28°C
                </div>

                <div className="grid grid-cols-3 gap-4 border-t pt-4">
                    <div>
                        <p className="text-sm text-gray-500">Feels like</p>
                        <p className="font-semibold">30°C</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Humidity</p>
                        <p className="font-semibold">72%</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Wind</p>
                        <p className="font-semibold">12 km/h</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard