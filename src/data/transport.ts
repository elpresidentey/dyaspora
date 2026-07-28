export type TransportOption = {
  type: string;
  city: string;
  country: string;
  provider: string;
  description: string;
  price: string;
  slug: string;
};

export const transport: TransportOption[] = [
  { type: "Ride-hailing", city: "Lagos", country: "Nigeria", provider: "Uber / Bolt", description: "Widely available across Lagos. Expect surge pricing during peak hours and rain.", price: "$5–$25 per trip", slug: "uber-lagos" },
  { type: "Bus", city: "Lagos", country: "Nigeria", provider: "LAGBUS / BRT", description: "Government bus network covering major routes. Air-conditioned and affordable.", price: "$0.50–$2 per ride", slug: "lagbus-lagos" },
  { type: "Ferry", city: "Lagos", country: "Nigeria", provider: "LAGFERRY", description: "Water transport across the lagoon — a scenic alternative to road traffic.", price: "$3–$8 per trip", slug: "lagferry-lagos" },
  { type: "Ride-hailing", city: "Accra", country: "Ghana", provider: "Uber / Bolt / Yango", description: "Reliable ride-hailing across Accra. Bolt is often cheaper.", price: "$4–$18 per trip", slug: "ride-accra" },
  { type: "Taxi", city: "Accra", country: "Ghana", provider: "Tro-Tro", description: "Shared minibus — the most authentic (and cheapest) way to get around.", price: "$0.30–$1 per ride", slug: "tro-tro-accra" },
  { type: "Ride-hailing", city: "Nairobi", country: "Kenya", provider: "Uber / Bolt / Little", description: "Little is local and often cheaper. All three compete heavily.", price: "$3–$15 per trip", slug: "ride-nairobi" },
  { type: "Bus", city: "Nairobi", country: "Kenya", provider: "Matatu", description: "Colourful minibuses with fixed routes — fast, loud, and part of the experience.", price: "$0.30–$2 per ride", slug: "matatu-nairobi" },
  { type: "Train", city: "Nairobi", country: "Kenya", provider: "SGR Madaraka Express", description: "Modern rail service from Nairobi to Mombasa along the coast.", price: "$10–$40 per seat", slug: "sgr-nairobi" },
  { type: "Ride-hailing", city: "Cape Town", country: "South Africa", provider: "Uber / Bolt", description: "Safe and widely available. Bolt is generally cheaper than Uber.", price: "$4–$20 per trip", slug: "ride-cape-town" },
  { type: "Rental", city: "Cape Town", country: "South Africa", provider: "Local Agencies", description: "Self-drive is popular — well-maintained roads and stunning coastal drives.", price: "$30–$80 per day", slug: "rental-cape-town" },
  { type: "Ride-hailing", city: "Kigali", country: "Rwanda", provider: "YEGO / SafeMotos", description: "App-based moto-taxis — the fastest way to navigate Kigali's hills.", price: "$2–$8 per trip", slug: "yego-kigali" },
  { type: "Taxi", city: "Kigali", country: "Rwanda", provider: "Special Hire Taxi", description: "Private car hire by the trip. Negotiate before you ride.", price: "$5–$20 per trip", slug: "taxi-kigali" },
  { type: "Ride-hailing", city: "Marrakech", country: "Morocco", provider: "Careem / Heetch", description: "Middle Eastern apps work well here. Petit taxis are cheaper for short hops.", price: "$3–$12 per trip", slug: "careem-marrakech" },
  { type: "Train", city: "Marrakech", country: "Morocco", provider: "ONCF", description: "High-speed Al Boraq and regular trains connecting major Moroccan cities.", price: "$10–$50 per seat", slug: "oncf-marrakech" },
  { type: "Ride-hailing", city: "Dakar", country: "Senegal", provider: "Yango / Heetch", description: "Yango is cheapest. Heetch has nicer cars. Both work well.", price: "$3–$15 per trip", slug: "yango-dakar" },
  { type: "Ride-hailing", city: "Lagos", country: "Nigeria", provider: "LagRide", description: "Government-backed ride-hailing app with fixed fares across Lagos.", price: "$4–$20 per trip", slug: "lagride-lagos" },
  { type: "Taxi", city: "Lagos", country: "Nigeria", provider: "Danfo", description: "Yellow minibuses — the backbone of Lagos transport. Cheap but crowded.", price: "$0.30–$0.80 per ride", slug: "danfo-lagos" },
  { type: "Ride-hailing", city: "Abuja", country: "Nigeria", provider: "Uber / Bolt", description: "Readily available in Abuja. Bolt offers better pricing.", price: "$4–$18 per trip", slug: "uber-abuja" },
  { type: "Taxi", city: "Abuja", country: "Nigeria", provider: "Abuja Taxi", description: "Metered taxis at the airport and hotels. Negotiate for longer trips.", price: "$5–$30 per trip", slug: "taxi-abuja" },
  { type: "Bus", city: "Accra", country: "Ghana", provider: "Ayalolo", description: "Modern bus system with dedicated lanes on key Accra routes.", price: "$0.40–$1 per ride", slug: "ayalolo-accra" },
  { type: "Rental", city: "Accra", country: "Ghana", provider: "Self-drive Agencies", description: "Rent a car from Avis, Europcar, or local agencies. Good roads to Cape Coast.", price: "$40–$90 per day", slug: "rental-accra" },
  { type: "Ride-hailing", city: "Kumasi", country: "Ghana", provider: "Uber / Bolt", description: "Available in Kumasi city centre. Less coverage on the outskirts.", price: "$3–$12 per trip", slug: "uber-kumasi" },
  { type: "Bus", city: "Kumasi", country: "Ghana", provider: "Metro Mass", description: "Government bus service connecting Kumasi to surrounding towns.", price: "$0.50–$2 per ride", slug: "metro-mass-kumasi" },
  { type: "Ride-hailing", city: "Abidjan", country: "Côte d'Ivoire", provider: "Yango / Heetch", description: "Widely used in Abidjan. Yango offers the lowest fares.", price: "$3–$15 per trip", slug: "yango-abidjan" },
  { type: "Taxi", city: "Abidjan", country: "Côte d'Ivoire", provider: "Woro-Woro", description: "Shared green taxis on fixed routes — cheap and everywhere.", price: "$0.50–$2 per ride", slug: "woro-woro-abidjan" },
  { type: "Ferry", city: "Abidjan", country: "Côte d'Ivoire", provider: "Abidjan Ferry", description: "Water taxis across the Ébrié Lagoon connecting Plateau and Cocody.", price: "$2–$5 per trip", slug: "ferry-abidjan" },
  { type: "Ride-hailing", city: "Addis Ababa", country: "Ethiopia", provider: "Ride / Feres", description: "Local ride-hailing apps. Feres is popular for moto-taxis.", price: "$2–$10 per trip", slug: "ride-addis" },
  { type: "Bus", city: "Addis Ababa", country: "Ethiopia", provider: "Anbessa City Bus", description: "Blue city buses covering most of Addis. Extremely affordable.", price: "$0.15–$0.50 per ride", slug: "anbessa-addis" },
  { type: "Train", city: "Addis Ababa", country: "Ethiopia", provider: "Addis Light Rail", description: "Two-line light rail system — quick way to beat the traffic.", price: "$0.20–$0.60 per ride", slug: "light-rail-addis" },
  { type: "Ride-hailing", city: "Dar es Salaam", country: "Tanzania", provider: "Uber / Bolt", description: "Growing ride-hailing market. Cash is still common.", price: "$3–$12 per trip", slug: "uber-dar" },
  { type: "Bus", city: "Dar es Salaam", country: "Tanzania", provider: "DART / BRT", description: "Modern bus rapid transit system on main corridors.", price: "$0.30–$1 per ride", slug: "dart-dar" },
  { type: "Ride-hailing", city: "Kampala", country: "Uganda", provider: "Uber / Bolt / SafeBoda", description: "SafeBoda is popular for motorcycle taxis. Uber covers cars.", price: "$2–$12 per trip", slug: "uber-kampala" },
  { type: "Taxi", city: "Kampala", country: "Uganda", provider: "Boda Boda", description: "Motorcycle taxis weaving through traffic. Always negotiate the fare first.", price: "$1–$5 per trip", slug: "boda-boda-kampala" },
  { type: "Ride-hailing", city: "Johannesburg", country: "South Africa", provider: "Uber / Bolt", description: "Safe and reliable across Jo'burg. Bolt is cheaper; Uber has better coverage.", price: "$4–$20 per trip", slug: "uber-johannesburg" },
  { type: "Train", city: "Johannesburg", country: "South Africa", provider: "Gautrain", description: "High-speed rail connecting Jo'burg, Sandton, and OR Tambo Airport.", price: "$5–$15 per seat", slug: "gautrain-johannesburg" },
  { type: "Bus", city: "Cape Town", country: "South Africa", provider: "MyCiTi", description: "Safe and efficient bus network connecting the city bowl to the suburbs.", price: "$1–$4 per ride", slug: "myciti-cape-town" },
  { type: "Ride-hailing", city: "Durban", country: "South Africa", provider: "Uber / Bolt", description: "Available across Durban. Offer lower prices than most SA cities.", price: "$3–$15 per trip", slug: "uber-durban" },
  { type: "Ride-hailing", city: "Lusaka", country: "Zambia", provider: "Uber / Yango", description: "Yango is growing fast in Lusaka with competitive rates.", price: "$3–$12 per trip", slug: "yango-lusaka" },
  { type: "Taxi", city: "Lusaka", country: "Zambia", provider: "Local Taxis", description: "No meters — agree on price before getting in.", price: "$5–$15 per trip", slug: "taxi-lusaka" },
  { type: "Ride-hailing", city: "Harare", country: "Zimbabwe", provider: "Uber / Hlalani", description: "Hlalani is the local alternative. Uber is available but limited.", price: "$3–$15 per trip", slug: "uber-harare" },
  { type: "Bus", city: "Harare", country: "Zimbabwe", provider: "ZUPCO", description: "Government-operated buses covering Harare and intercity routes.", price: "$0.30–$1 per ride", slug: "zupco-harare" },
  { type: "Ride-hailing", city: "Cairo", country: "Egypt", provider: "Uber / Careem / Swvl", description: "Three strong players. Swvl is great for fixed bus routes.", price: "$2–$10 per trip", slug: "uber-cairo" },
  { type: "Taxi", city: "Cairo", country: "Egypt", provider: "Black & White Taxi", description: "Traditional cabs. Agree on price or insist on the meter.", price: "$2–$8 per trip", slug: "taxi-cairo" },
  { type: "Train", city: "Cairo", country: "Egypt", provider: "Cairo Metro", description: "Three-line metro serving greater Cairo. Clean, cheap, and fast.", price: "$0.15–$0.50 per ride", slug: "metro-cairo" },
  { type: "Ride-hailing", city: "Casablanca", country: "Morocco", provider: "Careem / Heetch", description: "Both work well in Casablanca. Petit taxis are cheaper for short trips.", price: "$3–$12 per trip", slug: "careem-casablanca" },
  { type: "Train", city: "Casablanca", country: "Morocco", provider: "ONCF / Al Boraq", description: "High-speed train to Tangier. Regular service to Marrakech and Rabat.", price: "$10–$45 per seat", slug: "oncf-casablanca" },
  { type: "Ride-hailing", city: "Tunis", country: "Tunisia", provider: "Bolt", description: "Bolt is the main ride-hailing app. Taxis are plentiful too.", price: "$2–$10 per trip", slug: "bolt-tunis" },
  { type: "Taxi", city: "Tunis", country: "Tunisia", provider: "Yellow Taxis", description: "Metered taxis with reasonable rates. Add a small tip.", price: "$1–$8 per trip", slug: "taxi-tunis" },
];
