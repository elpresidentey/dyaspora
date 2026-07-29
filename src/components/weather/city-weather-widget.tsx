import { CloudSun, Sun, Cloud, CloudRain, CloudLightning, Snowflake, Droplets, Wind, Thermometer } from "lucide-react";
import { cityCoordinates } from "@/data/coordinates";

const WMO_CODES: Record<number, string> = {
  0: "Clear", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Overcast",
  45: "Foggy", 48: "Depositing Rime Fog",
  51: "Light Drizzle", 53: "Moderate Drizzle", 55: "Dense Drizzle",
  56: "Light Freezing Drizzle", 57: "Dense Freezing Drizzle",
  61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rain",
  66: "Light Freezing Rain", 67: "Heavy Freezing Rain",
  71: "Slight Snow", 73: "Moderate Snow", 75: "Heavy Snow",
  77: "Snow Grains",
  80: "Slight Rain Showers", 81: "Moderate Rain Showers", 82: "Violent Rain Showers",
  85: "Slight Snow Showers", 86: "Heavy Snow Showers",
  95: "Thunderstorm", 96: "Thunderstorm with Slight Hail", 99: "Thunderstorm with Heavy Hail",
};

function wmoIcon(code: number): { icon: React.ReactNode; label: string } {
  if (code === 0) return { icon: <Sun className="h-5 w-5 text-amber-400" />, label: "sun" };
  if (code <= 2) return { icon: <CloudSun className="h-5 w-5 text-amber-400" />, label: "cloud-sun" };
  if (code === 3 || (code >= 45 && code <= 48)) return { icon: <Cloud className="h-5 w-5 text-muted-foreground" />, label: "cloud" };
  if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82))
    return { icon: <CloudRain className="h-5 w-5 text-blue-400" />, label: "cloud-rain" };
  if (code >= 71 && code <= 77) return { icon: <Snowflake className="h-5 w-5 text-blue-300" />, label: "snowflake" };
  if (code >= 85 && code <= 86) return { icon: <Snowflake className="h-5 w-5 text-blue-300" />, label: "snowflake" };
  if (code >= 95) return { icon: <CloudLightning className="h-5 w-5 text-purple-400" />, label: "cloud-lightning" };
  return { icon: <Sun className="h-5 w-5 text-amber-400" />, label: "sun" };
}

export async function CityWeatherWidget({ slug }: { slug: string }) {
  const coords = cityCoordinates[slug];
  if (!coords) return null;

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=3`,
      { signal: AbortSignal.timeout(5000) }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const wcode = data.current?.weather_code ?? 0;
    const { icon } = wmoIcon(wcode);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="rounded-xl border bg-card p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand">
          <CloudSun className="h-4 w-4" />
          Current Weather
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold tabular-nums">{Math.round(data.current.temperature_2m)}°C</span>
              <span className="mb-1 text-sm text-muted-foreground">{WMO_CODES[wcode] ?? "Unknown"}</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Thermometer className="h-3 w-3" />Feels {Math.round(data.current.apparent_temperature)}°</span>
              <span className="flex items-center gap-1"><Droplets className="h-3 w-3" />{data.current.relative_humidity_2m}%</span>
              <span className="flex items-center gap-1"><Wind className="h-3 w-3" />{Math.round(data.current.wind_speed_10m)} km/h</span>
            </div>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">{icon}</span>
        </div>
        <div className="flex gap-2">
          {data.daily?.time?.slice(0, 3).map((date: string, i: number) => {
            const { icon: dayIcon } = wmoIcon(data.daily.weather_code[i]);
            return (
              <div key={date} className="flex-1 rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[11px] font-medium text-muted-foreground">{i === 0 ? "Today" : dayNames[new Date(date).getDay()]}</p>
                <div className="my-0.5 flex justify-center">{dayIcon}</div>
                <p className="text-xs font-semibold tabular-nums">
                  {Math.round(data.daily.temperature_2m_max[i])}°<span className="font-normal text-muted-foreground">/{Math.round(data.daily.temperature_2m_min[i])}°</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch {
    return null;
  }
}
