"use client";

import { useEffect, useState } from "react";
import { CloudSun, Sun, Cloud, CloudRain, CloudLightning, Snowflake, Thermometer, Droplets, Wind, MapPin, TriangleAlert } from "lucide-react";
import { destinations } from "@/data/destinations";

type WeatherData = {
  slug: string;
  current: { temp: number; feelsLike: number; humidity: number; wind: number; condition: string; icon: string };
  forecast: { date: string; high: number; low: number; condition: string; icon: string }[];
};

const regions = ["West Africa", "East Africa", "Southern Africa", "Central Africa", "North Africa"];

const iconMap: Record<string, React.ReactNode> = {
  sun: <Sun className="h-5 w-5 text-amber-400" />,
  "cloud-sun": <CloudSun className="h-5 w-5 text-amber-400" />,
  cloud: <Cloud className="h-5 w-5 text-muted-foreground" />,
  "cloud-rain": <CloudRain className="h-5 w-5 text-blue-400" />,
  "cloud-lightning": <CloudLightning className="h-5 w-5 text-purple-400" />,
  snowflake: <Snowflake className="h-5 w-5 text-blue-300" />,
};

function WeatherIcon({ icon }: { icon: string }) {
  return <>{iconMap[icon] || <Sun className="h-5 w-5 text-amber-400" />}</>;
}

function LoadingCard() {
  return (
    <div className="animate-pulse rounded-xl border bg-card p-5">
      <div className="mb-3 h-5 w-24 rounded bg-muted" />
      <div className="mb-2 h-8 w-16 rounded bg-muted" />
      <div className="mb-3 h-4 w-20 rounded bg-muted" />
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 rounded-lg bg-muted p-2">
            <div className="mx-auto mb-1 h-3 w-8 rounded bg-muted-foreground/20" />
            <div className="mx-auto h-5 w-10 rounded bg-muted-foreground/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherCard({ data }: { data: WeatherData }) {
  const dest = destinations.find((d) => d.slug === data.slug);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="group rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {dest?.country ?? ""}
          </div>
          <h3 className="text-lg font-semibold">{dest?.city ?? data.slug}</h3>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
          <WeatherIcon icon={data.current.icon} />
        </span>
      </div>

      <div className="mb-3 flex items-end gap-1">
        <span className="text-3xl font-bold tabular-nums">{data.current.temp}°</span>
        <span className="mb-1 text-sm text-muted-foreground">{data.current.condition}</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Thermometer className="h-3 w-3" />Feels {data.current.feelsLike}°</span>
        <span className="flex items-center gap-1"><Droplets className="h-3 w-3" />{data.current.humidity}%</span>
        <span className="flex items-center gap-1"><Wind className="h-3 w-3" />{data.current.wind} km/h</span>
      </div>

      <div className="flex gap-2">
        {data.forecast.slice(0, 3).map((day, i) => (
          <div key={day.date} className="flex-1 rounded-lg bg-muted/50 p-2 text-center">
            <p className="text-[11px] font-medium text-muted-foreground">{i === 0 ? "Today" : dayNames[new Date(day.date).getDay()]}</p>
            <div className="my-0.5 flex justify-center"><WeatherIcon icon={day.icon} /></div>
            <p className="text-xs font-semibold tabular-nums">{day.high}°<span className="font-normal text-muted-foreground">/{day.low}°</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<Record<string, WeatherData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem("dyaspora_weather");
    if (cached) {
      try { setWeather(JSON.parse(cached)); setLoading(false); } catch { /* ignore */ }
    }

    fetch("/api/weather?all=true")
      .then((r) => r.json())
      .then((data) => {
        if (data.weather) {
          setWeather(data.weather);
          sessionStorage.setItem("dyaspora_weather", JSON.stringify(data.weather));
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const grouped = destinations.reduce<Record<string, typeof destinations>>((acc, d) => {
    if (weather[d.slug]) {
      (acc[d.region] ??= []).push(d);
    }
    return acc;
  }, {});

  const visibleRegions = activeRegion
    ? regions.filter((r) => r === activeRegion)
    : regions.filter((r) => grouped[r]?.length);

  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1">
            <CloudSun className="h-3.5 w-3.5 text-brand" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">Weather</p>
          </div>
          <h1 className="font-serif text-4xl font-bold md:text-5xl">Forecast</h1>
          <p className="mt-3 text-lg text-muted-foreground">Current conditions and 3-day forecast across the diaspora</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveRegion(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !activeRegion ? "bg-brand text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All
          </button>
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                activeRegion === r ? "bg-brand text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {r.replace("Africa", "")}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
            <TriangleAlert className="h-4 w-4 shrink-0" />
            Could not load live weather data. Showing cached data if available.
          </div>
        )}

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => <LoadingCard key={i} />)}
          </div>
        ) : (
          visibleRegions.map((region) => {
            const cities = grouped[region];
            if (!cities?.length) return null;
            return (
              <div key={region} className="mb-12">
                <h2 className="mb-5 font-serif text-2xl font-semibold">{region}</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {cities.map((city) => (
                    <WeatherCard key={city.slug} data={weather[city.slug]} />
                  ))}
                </div>
              </div>
            );
          })
        )}

        {!loading && Object.keys(weather).length === 0 && (
          <div className="py-20 text-center text-muted-foreground">No weather data available.</div>
        )}
      </div>
    </section>
  );
}
