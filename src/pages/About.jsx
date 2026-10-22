import React from 'react'


function About() {
  return (
    <main className="min-h-screen px-5 py-16 text-[#252A30] sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Hero section */}
        <section className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
            About Weatherly
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Weather, made easier.
          </h1>

          <p className="text-base leading-8 text-[#64717D] sm:text-lg">
            Weatherly brings current weather conditions, upcoming forecasts,
            and interactive weather maps together in one place. Explore
            weather conditions for different cities and get a clearer picture
            of what is happening around you.
          </p>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
            What you can do
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white/70 p-6">
              <h3 className="mb-3 text-lg font-semibold">
                Current Weather
              </h3>
              <p className="leading-7 text-[#64717D]">
                Search for a city and check its current temperature and
                weather conditions.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white/70 p-6">
              <h3 className="mb-3 text-lg font-semibold">
                Weather Forecast
              </h3>
              <p className="leading-7 text-[#64717D]">
                Explore upcoming weather conditions and plan ahead with
                forecast information.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white/70 p-6">
              <h3 className="mb-3 text-lg font-semibold">
                Interactive Map
              </h3>
              <p className="leading-7 text-[#64717D]">
                Explore weather layers on a map to visualize temperature,
                precipitation, clouds, and wind.
              </p>
            </article>
          </div>
        </section>

        {/* Technologies */}
        <section className="border-t border-slate-200 pt-8">
          <h2 className="mb-4 text-2xl font-bold">
            Built with
          </h2>

          <p className="mb-5 max-w-2xl leading-7 text-[#64717D]">
            Weatherly is a learning project built to practice frontend
            development, API integration, routing, state management, and
            interactive map visualization.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "React",
              "Vite",
              "Tailwind CSS",
              "React Router",
              "Leaflet",
              "OpenWeather API",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default About;


