
import { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'

function Forecast() {
    const { forecast, searchedCity } = useContext(WeatherContext)

    if (!forecast || !forecast.list?.length) {
        return (
            <main className="min-h-screen bg-white px-4 py-8 sm:px-8">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold text-slate-800">
                        48-Hour Forecast
                    </h1>
                    <p className="mt-3 text-slate-500">
                        Search for a city on the Home page to see its forecast.
                    </p>
                </div>
            </main>
        )
    }

    const now = Date.now() / 1000

    const entries = forecast.list
        .filter(item => item.dt >= now && item.dt <= now + 48 * 60 * 60)
        .slice(0, 16)

    const periods = entries.length
        ? entries
        : forecast.list.slice(0, 16)

    const temperatures = periods.map(item => item.main.temp)
    const minTemp = Math.min(...temperatures)
    const maxTemp = Math.max(...temperatures)
    const range = maxTemp - minTemp || 1

    const points = temperatures.map((temp, index) => {
        const x = periods.length === 1
            ? 160
            : 8 + (index / (periods.length - 1)) * 304

        const y = 56 - ((temp - minTemp) / range) * 40

        return { x, y, temp }
    })

    const graphLine = points
        .map(point => `${point.x},${point.y}`)
        .join(' ')

    const formatTime = timestamp =>
        new Date(timestamp * 1000).toLocaleTimeString([], {
            hour: 'numeric',
            hour12: true
        })

    const formatDay = timestamp =>
        new Date(timestamp * 1000).toLocaleDateString([], {
            weekday: 'short'
        })

    return (
        <main className="min-h-screen bg-white px-4 py-8 sm:px-8 sm:py-10">
            <section className="mx-auto max-w-6xl space-y-8">

                {/* Page heading */}
                <header className="border-b border-slate-200 pb-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Weather outlook
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                        48-Hour Forecast
                    </h1>

                    <p className="mt-2 text-slate-500">
                        {searchedCity || forecast.city?.name || 'Selected city'}
                        {' · '}Next available forecast periods
                    </p>
                </header>

                {/* Hourly forecast */}
                <section>
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">
                                Hourly forecast
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Updates every 3 hours
                            </p>
                        </div>

                        <span className="text-sm text-slate-500">
                            {periods.length} periods
                        </span>
                    </div>

                    <div className="flex snap-x snap-mandatory overflow-x-auto rounded-xl border border-slate-200 bg-white">
                        {periods.map((item, index) => (
                            <article
                                key={item.dt}
                                className={`min-w-[104px] flex-1 snap-start px-3 py-5 text-center sm:min-w-0 sm:px-2 ${
                                    index > 0 ? 'border-l border-slate-200' : ''
                                }`}
                            >
                                <p className="text-xs font-medium text-slate-500">
                                    {formatDay(item.dt)}
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {formatTime(item.dt)}
                                </p>

                                <img
                                    className="mx-auto my-3 h-12 w-12"
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                    alt={item.weather[0].description}
                                />

                                <p className="text-2xl font-semibold text-slate-800">
                                    {Math.round(item.main.temp)}°
                                </p>

                                <p
                                    className="mx-auto mt-2 max-w-[100px] truncate text-xs capitalize text-slate-500"
                                    title={item.weather[0].description}
                                >
                                    {item.weather[0].description}
                                </p>

                                <p className="mt-4 text-xs font-medium text-blue-600">
                                    💧 {Math.round(item.pop * 100)}%
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Temperature graph */}
                <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-800">
                                Temperature trend
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Temperature throughout the forecast
                            </p>
                        </div>

                        <p className="shrink-0 text-sm font-medium text-blue-600">
                            {Math.round(minTemp)}° – {Math.round(maxTemp)}°C
                        </p>
                    </div>

                    <svg
                        viewBox="0 0 320 74"
                        className="mt-6 w-full overflow-visible"
                        role="img"
                        aria-label="Temperature trend across forecast periods"
                    >
                        <polyline
                            points={graphLine}
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {points.map((point, index) => (
                            <circle
                                key={periods[index].dt}
                                cx={point.x}
                                cy={point.y}
                                r="3"
                                fill="#2563eb"
                            />
                        ))}
                    </svg>

                    <div className="mt-2 flex justify-between text-xs text-slate-500">
                        <span>{formatTime(periods[0].dt)}</span>
                        <span>{formatTime(periods[periods.length - 1].dt)}</span>
                    </div>
                </section>

                {/* Weather details */}
                <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Weather details
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Conditions for the first available forecast period
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4">
                        <div className="border-b border-slate-200 py-4 pr-4 sm:border-b-0 sm:border-r">
                            <p className="text-sm text-slate-500">Feels like</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-800">
                                {Math.round(periods[0].main.feels_like)}°C
                            </p>
                        </div>

                        <div className="border-b border-slate-200 py-4 pl-4 sm:border-b-0 sm:border-r sm:px-6">
                            <p className="text-sm text-slate-500">Humidity</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-800">
                                {periods[0].main.humidity}%
                            </p>
                        </div>

                        <div className="border-b border-slate-200 py-4 pr-4 sm:border-b-0 sm:border-r sm:px-6">
                            <p className="text-sm text-slate-500">Wind speed</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-800">
                                {periods[0].wind.speed} m/s
                            </p>
                        </div>

                        <div className="py-4 pl-4 sm:pl-6">
                            <p className="text-sm text-slate-500">Rain chance</p>
                            <p className="mt-2 text-2xl font-semibold text-blue-600">
                                {Math.round(periods[0].pop * 100)}%
                            </p>
                        </div>
                    </div>
                </section>

            </section>
        </main>
    )
}

export default Forecast
