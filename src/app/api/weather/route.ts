import { NextRequest, NextResponse } from "next/server";
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

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("city");
    const allCities = request.nextUrl.searchParams.get("all") === "true";

    if (allCities) {
      const entries = Object.entries(cityCoordinates);
      const results = await Promise.allSettled(
        entries.map(async ([slug, { lat, lon }]) => {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=3`,
            { signal: AbortSignal.timeout(10000) }
          );
          const data = await res.json();
          const wcode = data.current?.weather_code ?? 0;
          const dwcode = data.daily?.weather_code?.[0] ?? 0;
          return {
            slug,
            current: {
              temp: Math.round(data.current?.temperature_2m ?? 0),
              feelsLike: Math.round(data.current?.apparent_temperature ?? 0),
              humidity: data.current?.relative_humidity_2m ?? 0,
              wind: Math.round(data.current?.wind_speed_10m ?? 0),
              condition: WMO_CODES[wcode] ?? "Unknown",
              icon: wmoIcon(wcode),
            },
            forecast: data.daily?.time?.slice(0, 3).map((date: string, i: number) => ({
              date,
              high: Math.round(data.daily.temperature_2m_max[i]),
              low: Math.round(data.daily.temperature_2m_min[i]),
              condition: WMO_CODES[data.daily.weather_code[i]] ?? "Unknown",
              icon: wmoIcon(data.daily.weather_code[i]),
            })) ?? [],
          };
        })
      );

      const weather: Record<string, unknown> = {};
      for (const result of results) {
        if (result.status === "fulfilled") {
          weather[result.value.slug] = result.value;
        }
      }
      return NextResponse.json({ weather });
    }

    if (!slug || !cityCoordinates[slug]) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const { lat, lon } = cityCoordinates[slug];
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7`,
      { signal: AbortSignal.timeout(10000) }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Weather API error" }, { status: 502 });
    }

    const data = await res.json();
    const wcode = data.current?.weather_code ?? 0;

    return NextResponse.json({
      slug,
      current: {
        temp: Math.round(data.current?.temperature_2m ?? 0),
        feelsLike: Math.round(data.current?.apparent_temperature ?? 0),
        humidity: data.current?.relative_humidity_2m ?? 0,
        wind: Math.round(data.current?.wind_speed_10m ?? 0),
        condition: WMO_CODES[wcode] ?? "Unknown",
        icon: wmoIcon(wcode),
      },
      forecast: data.daily?.time?.map((date: string, i: number) => ({
        date,
        high: Math.round(data.daily.temperature_2m_max[i]),
        low: Math.round(data.daily.temperature_2m_min[i]),
        condition: WMO_CODES[data.daily.weather_code[i]] ?? "Unknown",
        icon: wmoIcon(data.daily.weather_code[i]),
      })) ?? [],
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}

function wmoIcon(code: number): string {
  if (code === 0) return "sun";
  if (code <= 2) return "cloud-sun";
  if (code === 3 || (code >= 45 && code <= 48)) return "cloud";
  if ((code >= 51 && code <= 57) || (code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "cloud-rain";
  if (code >= 71 && code <= 77) return "snowflake";
  if (code >= 85 && code <= 86) return "snowflake";
  if (code >= 95) return "cloud-lightning";
  return "sun";
}
