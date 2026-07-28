import { NextRequest, NextResponse } from "next/server";

const API_KEY = "07f359da533eb7866ece8e8c9cb92465";
const BASE_URL = "https://api.aviationstack.com/v1/flights";

const cityToIata: Record<string, string> = {
  lagos: "LOS", accra: "ACC", nairobi: "NBO", "cape town": "CPT",
  johannesburg: "JNB", dakar: "DSS", casablanca: "CMN", cairo: "CAI",
  marrakech: "RAK", tunis: "TUN", "addis ababa": "ADD", kigali: "KGL",
  abuja: "ABV", bamako: "BKO", douala: "DLA", yaoundé: "NSI",
  libreville: "LBV", cotonou: "COO", lusaka: "LUN", harare: "HRE",
  maputo: "MPM", luanda: "LAD", dar: "DAR", "dar es salaam": "DAR",
  kampala: "EBB", kinshasa: "FIH", brazzaville: "BZV", freetown: "FNA",
  windhoek: "WDH", gaborone: "GBE", lilongwe: "LLW", bangui: "BGF",
  nouakchott: "NKC", ouagadougou: "OUA", niamey: "NIM", banjul: "BJL",
  conakry: "CKY", monrovia: "ROB", bissau: "OXB", malabo: "SSG",
  "são tomé": "TMS", "n'djamena": "NDJ", khartoum: "KRT", moroni: "HAH",
  antananarivo: "TNR", victoria: "SEZ", zanzibar: "ZNZ",
  "new york": "JFK", london: "LHR", paris: "CDG", washington: "IAD",
  chicago: "ORD", atlanta: "ATL", "los angeles": "LAX", miami: "MIA",
  boston: "BOS", houston: "IAH", toronto: "YYZ", dallas: "DFW",
  dubai: "DXB", istanbul: "IST", amsterdam: "AMS", frankfurt: "FRA",
  madrid: "MAD", lisbon: "LIS", rome: "FCO", brussels: "BRU",
  zurich: "ZRH", doha: "DOH", abu: "AUH", addis: "ADD",
};

function extractIata(input: string): string | null {
  const match = input.match(/\(([A-Z]{3})\)/);
  if (match) return match[1];
  const upper = input.toUpperCase().trim();
  if (/^[A-Z]{3}$/.test(upper)) return upper;
  const lower = input.toLowerCase().trim();
  for (const [city, iata] of Object.entries(cityToIata)) {
    if (lower.includes(city)) return iata;
  }
  return null;
}

function formatAirport(airport: string | null, iata: string | null): string {
  const code = iata || "";
  const name = (airport || "").trim();
  if (name && name !== "empty" && name !== code) return `${name} (${code})`;
  if (code) return `(${code})`;
  return "Unknown Airport";
}

function generatePrice(depIata: string, arrIata: string): number {
  const us = ["JFK", "ORD", "LAX", "ATL", "MIA", "BOS", "IAD", "IAH", "DFW", "YYZ"];
  const uk = ["LHR", "LGW", "STN"];
  const eu = ["CDG", "AMS", "FRA", "MAD", "LIS", "FCO", "BRU", "ZRH", "MUC"];
  const me = ["DXB", "DOH", "AUH", "IST", "CAI"];
  const af = ["LOS", "ACC", "NBO", "JNB", "CPT", "DSS", "CMN", "ADD", "KGL", "DAR",
    "ABV", "DLA", "BKO", "COO", "LBV", "LUN", "HRE", "MPM", "LAD", "EBB", "FIH",
    "BZV", "OUA", "NKC", "NIM", "CKY", "FNA", "ROB", "BJL", "NSI", "WDH", "GBE",
    "LLW", "BGF", "NDJ", "KRT", "TNR", "SEZ", "ZNZ"];

  const zone = (code: string) =>
    us.includes(code) ? "US" : uk.includes(code) ? "UK" : eu.includes(code) ? "EU" :
    me.includes(code) ? "ME" : af.includes(code) ? "AF" : "OTHER";

  const dz = zone(depIata);
  const az = zone(arrIata);

  const priceRanges: Record<string, [number, number]> = {
    "US-AF": [600, 1500], "UK-AF": [400, 1200], "EU-AF": [350, 1100],
    "ME-AF": [400, 1000], "AF-AF": [100, 600], "US-EU": [300, 900],
    "UK-EU": [100, 400], "US-UK": [300, 800], "OTHER": [200, 800],
  };

  const key = `${dz}-${az}`;
  const [min, max] = priceRanges[key] || priceRanges.OTHER;
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function generateDuration(depIata: string, arrIata: string): number {
  const westAfrica = ["LOS", "ACC", "DSS", "ABV", "DLA", "BKO", "COO", "OUA", "NKC", "NIM", "CKY", "FNA", "ROB", "BJL", "BGF", "NDJ"];
  const eastAfrica = ["NBO", "ADD", "KGL", "DAR", "EBB", "ZNZ", "SEZ"];
  const southernAfrica = ["JNB", "CPT", "LUN", "HRE", "MPM", "LAD", "WDH", "GBE", "LLW"];
  const northAfrica = ["CMN", "RAK", "CAI", "TUN"];
  const us = ["JFK", "ORD", "LAX", "ATL", "MIA", "BOS", "IAD", "IAH", "DFW", "YYZ"];
  const uk = ["LHR", "LGW", "STN"];
  const eu = ["CDG", "AMS", "FRA", "MAD", "LIS", "FCO", "BRU", "ZRH", "MUC"];
  const me = ["DXB", "DOH", "AUH", "IST", "CAI"];

  const region = (code: string) =>
    us.includes(code) ? "US" : uk.includes(code) ? "UK" : eu.includes(code) ? "EU" :
    me.includes(code) ? "ME" : northAfrica.includes(code) ? "NA" :
    westAfrica.includes(code) ? "WA" : eastAfrica.includes(code) ? "EA" :
    southernAfrica.includes(code) ? "SA" : "OTHER";

  const dr = region(depIata);
  const ar = region(arrIata);

  const durationRanges: Record<string, [number, number]> = {
    "US-WA": [540, 660], "US-EA": [780, 900], "US-SA": [840, 960], "US-NA": [420, 540],
    "UK-WA": [360, 420], "UK-EA": [480, 540], "UK-SA": [600, 660], "UK-NA": [240, 300],
    "EU-WA": [300, 420], "EU-EA": [420, 540], "EU-SA": [540, 660], "EU-NA": [180, 240],
    "ME-WA": [300, 420], "ME-EA": [240, 300], "ME-SA": [360, 480], "ME-NA": [180, 240],
    "WA-WA": [60, 180], "EA-EA": [60, 180], "SA-SA": [60, 180], "NA-NA": [60, 180],
    "WA-EA": [240, 360], "WA-SA": [300, 420], "WA-NA": [240, 300],
    "EA-SA": [240, 360], "EA-NA": [300, 420], "SA-NA": [360, 480],
    "US-EU": [360, 480], "US-UK": [360, 480], "UK-EU": [60, 120],
    "OTHER": [120, 360],
  };

  const key = `${dr}-${ar}`;
  const revKey = `${ar}-${dr}`;
  const [min, max] = durationRanges[key] || durationRanges[revKey] || durationRanges.OTHER;
  const raw = Math.random() * (max - min) + min;
  return Math.round(raw / 5) * 5;
}

function generateCabinClass(): string {
  const classes = ["economy", "economy", "economy", "premium economy", "business"];
  return classes[Math.floor(Math.random() * classes.length)];
}

function generateSeats(): number {
  return Math.floor(Math.random() * 60) + 5;
}

const airlines = [
  { name: "Ethiopian Airlines", prefix: "ET", hubs: ["ADD", "LOS", "ACC", "NBO"] },
  { name: "Kenya Airways", prefix: "KQ", hubs: ["NBO", "LOS", "ACC"] },
  { name: "RwandAir", prefix: "WB", hubs: ["KGL", "LOS", "ACC", "NBO"] },
  { name: "Royal Air Maroc", prefix: "AT", hubs: ["CMN", "RAK", "DSS"] },
  { name: "EgyptAir", prefix: "MS", hubs: ["CAI", "LOS", "ACC"] },
  { name: "South African Airways", prefix: "SA", hubs: ["JNB", "CPT", "LOS"] },
  { name: "Air Peace", prefix: "P4", hubs: ["LOS", "ABV", "ACC"] },
  { name: "Africa World Airlines", prefix: "AW", hubs: ["ACC", "LOS"] },
  { name: "Air Senegal", prefix: "HC", hubs: ["DSS", "ACC", "LOS"] },
  { name: "Air Côte d'Ivoire", prefix: "HF", hubs: ["ABJ", "ACC", "LOS"] },
  { name: "ASKY Airlines", prefix: "KP", hubs: ["LFW", "ACC", "LOS", "DSS"] },
  { name: "Air Burkina", prefix: "2J", hubs: ["OUA", "ACC"] },
  { name: "Camair-Co", prefix: "QC", hubs: ["DLA", "NSI"] },
  { name: "TAAG Angola", prefix: "DT", hubs: ["LAD", "JNB"] },
  { name: "LAM Mozambique", prefix: "TM", hubs: ["MPM", "JNB"] },
  { name: "Air Tanzania", prefix: "TC", hubs: ["DAR", "JNB", "NBO"] },
  { name: "Uganda Airlines", prefix: "UR", hubs: ["EBB", "NBO"] },
  { name: "Zambia Airways", prefix: "ZN", hubs: ["LUN", "JNB"] },
  { name: "Air Mauritius", prefix: "MK", hubs: ["MRU", "JNB"] },
  { name: "Precision Air", prefix: "PW", hubs: ["DAR", "ZNZ", "NBO"] },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const origin = searchParams.get("origin") || "";
    const destination = searchParams.get("destination") || "";
    const date = searchParams.get("date") || "";
    const minPrice = parseInt(searchParams.get("minPrice") || "0");
    const maxPrice = parseInt(searchParams.get("maxPrice") || "99999");
    const stopsFilter = searchParams.get("stops") || "all";

    const depIata = extractIata(origin);
    const arrIata = extractIata(destination);

    // Try aviationstack API first
    if (depIata || arrIata) {
      try {
        const params = new URLSearchParams({ access_key: API_KEY });
        if (depIata) params.set("dep_iata", depIata);
        if (arrIata) params.set("arr_iata", arrIata);
        if (date) params.set("flight_date", date);
        params.set("limit", "50");

        const res = await fetch(`${BASE_URL}?${params}`, {
          headers: { "User-Agent": "dyaspora/1.0" },
          signal: AbortSignal.timeout(8000),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.data && data.data.length > 0) {
            const flights = data.data
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .filter((f: any) => f.airline?.name && f.airline.name !== "empty" && f.flight?.number)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((f: any, i: number) => {
                const depTime = f.departure?.scheduled || f.departure?.estimated || new Date().toISOString();
                const arrTime = f.arrival?.scheduled || f.arrival?.estimated || f.arrival?.actual || depTime;
                const duration = Math.round(
                  (new Date(arrTime).getTime() - new Date(depTime).getTime()) / 60000
                );

                return {
                  id: `api-${i}-${f.flight?.iata || f.flight?.number}`,
                  airline: f.airline.name,
                  flightNumber: f.flight?.iata || f.flight?.number,
                  origin: formatAirport(f.departure?.airport, f.departure?.iata),
                  destination: formatAirport(f.arrival?.airport, f.arrival?.iata),
                  departureTime: depTime,
                  arrivalTime: arrTime,
                  duration: duration > 0 ? duration : 120,
                  price: generatePrice(f.departure?.iata || depIata || "LOS", f.arrival?.iata || arrIata || "ACC"),
                  currency: "USD",
                  cabinClass: generateCabinClass(),
                  availableSeats: generateSeats(),
                  stops: f.flight?.number ? (Math.random() > 0.5 ? 0 : 1) : 0,
                };
              });

            if (flights.length > 0) {
              return NextResponse.json({ flights, count: flights.length });
            }
          }
        }
      } catch {
        console.warn("Aviationstack API error, falling back to mock data");
      }
    }

    // Fall back to dynamically generated mock flights
    const depIataName = depIata
      ? `${(Object.entries(cityToIata).find(([, v]) => v === depIata)?.[0] || depIata).replace(/^./, c => c.toUpperCase())} (${depIata})`
      : origin;
    const arrIataName = arrIata
      ? `${(Object.entries(cityToIata).find(([, v]) => v === arrIata)?.[0] || arrIata).replace(/^./, c => c.toUpperCase())} (${arrIata})`
      : destination;

    const timesOfDay = [
      { dep: "06:00", arr: "09:30" }, { dep: "08:15", arr: "11:45" },
      { dep: "11:30", arr: "15:00" }, { dep: "14:00", arr: "17:30" },
      { dep: "17:45", arr: "21:15" }, { dep: "21:00", arr: "00:30" },
    ];

    const cabinOptions = ["economy", "economy", "economy", "premium economy", "business"];
    const searchDate = date ? new Date(date) : new Date();

    const generatedFlights = airlines.flatMap((airline, ai) => {
      const servesRoute = depIata && arrIata
        ? (airline.hubs.includes(depIata) || airline.hubs.includes(arrIata) || Math.random() > 0.5)
        : Math.random() > 0.4;

      if (!servesRoute) return [];

      return timesOfDay
        .filter(() => Math.random() > 0.3)
        .map((timeSlot, ti) => {
          const depDate = new Date(searchDate);
          const [dh, dm] = timeSlot.dep.split(":").map(Number);
          depDate.setHours(dh, dm, 0, 0);

          const baseDuration = depIata && arrIata
            ? generateDuration(depIata, arrIata)
            : 90 + Math.floor(Math.random() * 450);
          const duration = Math.round(baseDuration / 5) * 5;

          const arrDate = new Date(depDate.getTime() + duration * 60000);

          const flightNum = `${airline.prefix}${100 + ai * 20 + ti}`;
          const price = depIata && arrIata
            ? generatePrice(depIata, arrIata)
            : 200 + Math.floor(Math.random() * 800);

          const stops = Math.random() > 0.55 ? 0 : Math.floor(Math.random() * 2) + 1;

          return {
            id: `mock-${flightNum}`,
            airline: airline.name,
            flightNumber: flightNum,
            origin: depIataName || origin,
            destination: arrIataName || destination,
            departureTime: depDate.toISOString(),
            arrivalTime: arrDate.toISOString(),
            duration,
            price,
            currency: "USD",
            cabinClass: cabinOptions[Math.floor(Math.random() * cabinOptions.length)],
            availableSeats: Math.floor(Math.random() * 50) + 5,
            stops,
          };
        });
    });

    let flights = generatedFlights.slice(0, 25);

    if (minPrice > 0) flights = flights.filter((f) => f.price >= minPrice);
    if (maxPrice < 99999) flights = flights.filter((f) => f.price <= maxPrice);
    if (stopsFilter === "direct") flights = flights.filter((f) => f.stops === 0);
    if (stopsFilter === "1+") flights = flights.filter((f) => (f.stops ?? 0) >= 1);

    return NextResponse.json({
      flights: flights.slice(0, 25),
      count: flights.length,
    });
  } catch (error) {
    console.error("Flights search error:", error);
    return NextResponse.json(
      { error: "Failed to search flights" },
      { status: 500 }
    );
  }
}
