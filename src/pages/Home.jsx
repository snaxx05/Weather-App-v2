import React from 'react'
import SearchBar from '../components/common/SearchBar'
import WeatherCard from '../components/common/WeatherCard'

function Home() {
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
                    <SearchBar />
                </div>

                <WeatherCard/>
            </section>
        </main>
    )
}

export default Home