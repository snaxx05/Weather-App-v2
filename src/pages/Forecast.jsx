
import { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'

function Forecast() {
    const { forecast, searchedCity } = useContext(WeatherContext)

    if (!forecast || !forecast.list?.length) {
        return (
            <main className="min-h-screen bg-slate-100 px-4 py-12">
                <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-800">
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

    // Fallback in case the current time falls outside the returned entries.
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
        <main className="min-h-screen bg-slate-100 px-4 py-8 sm:py-12">
            <section className="mx-auto max-w-5xl space-y-6">

                <header>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        Weather outlook
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                        48-Hour Forecast
                    </h1>
                    <p className="mt-2 text-slate-500">
                        {searchedCity || forecast.city?.name || 'Selected city'}
                        {' · '}Next available forecast periods
                    </p>
                </header>

                <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-blue-950 p-5 text-white shadow-lg sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Next 48 hours
                            </h2>
                            <p className="mt-1 text-sm text-blue-200">
                                Updates every 3 hours
                            </p>
                        </div>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-blue-100">
                            {periods.length} periods
                        </span>
                    </div>

                    <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4">
                        {periods.map(item => (
                            <article
                                key={item.dt}
                                className="min-w-[100px] snap-start rounded-2xl border border-white/10 bg-white/10 px-3 py-4 text-center"
                            >
                                <p className="text-xs font-medium text-blue-100">
                                    {formatDay(item.dt)}
                                </p>
                                <p className="mt-1 text-sm font-semibold">
                                    {formatTime(item.dt)}
                                </p>

                                <img
                                    className="mx-auto my-2 h-14 w-14"
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                    alt={item.weather[0].description}
                                />

                                <p className="text-2xl font-bold">
                                    {Math.round(item.main.temp)}°
                                </p>
                                <p className="mt-1 max-w-[100px] truncate text-xs capitalize text-blue-100">
                                    {item.weather[0].description}
                                </p>

                                <p className="mt-4 text-xs text-blue-100">
                                    💧 {Math.round(item.pop * 100)}%
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-3 rounded-2xl bg-black/15 p-4">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="font-semibold">
                                Temperature trend
                            </h3>
                            <p className="text-sm text-blue-100">
                                {Math.round(minTemp)}° – {Math.round(maxTemp)}°C
                            </p>
                        </div>

                        <svg
                            viewBox="0 0 320 74"
                            className="mt-4 w-full overflow-visible"
                            role="img"
                            aria-label="Temperature trend across forecast periods"
                        >
                            <polyline
                                points={graphLine}
                                fill="none"
                                stroke="#bfdbfe"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            {points.map((point, index) => (
                                <circle
                                    key={periods[index].dt}
                                    cx={point.x}
                                    cy={point.y}
                                    r="3.5"
                                    fill="white"
                                />
                            ))}
                        </svg>

                        <div className="mt-1 flex justify-between text-xs text-blue-200">
                            <span>{formatTime(periods[0].dt)}</span>
                            <span>{formatTime(periods[periods.length - 1].dt)}</span>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
                    <h2 className="text-lg font-bold text-slate-800">
                        Weather details
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Conditions for the first available forecast period
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Feels like</p>
                            <p className="mt-2 text-2xl font-bold text-slate-800">
                                {Math.round(periods[0].main.feels_like)}°C
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Humidity</p>
                            <p className="mt-2 text-2xl font-bold text-slate-800">
                                {periods[0].main.humidity}%
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Wind speed</p>
                            <p className="mt-2 text-2xl font-bold text-slate-800">
                                {periods[0].wind.speed} m/s
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Rain chance</p>
                            <p className="mt-2 text-2xl font-bold text-slate-800">
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