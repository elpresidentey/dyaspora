export type Destination = {
  city: string;
  country: string;
  region: string;
  tag: string;
  image?: string;
  slug: string;
};

export const destinations: Destination[] = [
  // West Africa
  { city: "Lagos", country: "Nigeria", region: "West Africa", tag: "The Centre of Excellence", image: "/images/Lagos.jpg", slug: "lagos" },
  { city: "Abuja", country: "Nigeria", region: "West Africa", tag: "Nigeria's purpose-built capital", image: "/images/Abuja.jpg", slug: "abuja" },
  { city: "Accra", country: "Ghana", region: "West Africa", tag: "Gateway to West Africa", image: "/images/Accra.jpg", slug: "accra" },
  { city: "Kumasi", country: "Ghana", region: "West Africa", tag: "Heart of Ashanti Kingdom", image: "/images/Kumasi.jpg", slug: "kumasi" },
  { city: "Dakar", country: "Senegal", region: "West Africa", tag: "Paris of West Africa", image: "/images/Dakar.jpg", slug: "dakar" },
  { city: "Abidjan", country: "Côte d'Ivoire", region: "West Africa", tag: "Manhattan of the Tropics", image: "/images/Abidjan.jpg", slug: "abidjan" },
  { city: "Banjul", country: "Gambia", region: "West Africa", tag: "The Smiling Coast", image: "/images/Banjul.jpg", slug: "banjul" },
  { city: "Freetown", country: "Sierra Leone", region: "West Africa", tag: "Where Africa meets the Atlantic", image: "/images/Freetown.jpg", slug: "freetown" },
  { city: "Monrovia", country: "Liberia", region: "West Africa", tag: "Africa's oldest republic", image: "/images/Monrovia.jpg", slug: "monrovia" },
  { city: "Ouagadougou", country: "Burkina Faso", region: "West Africa", tag: "Land of the upright people", image: "/images/Ouagadougou.jpg", slug: "ouagadougou" },
  { city: "Bamako", country: "Mali", region: "West Africa", tag: "Niger's riverside gem", image: "/images/Bamako.jpg", slug: "bamako" },
  { city: "Cotonou", country: "Benin", region: "West Africa", tag: "Gateway to the Gateway of Africa", image: "/images/Cotonou.jpg", slug: "cotonou" },
  { city: "Lomé", country: "Togo", region: "West Africa", tag: "Pearl of West Africa", image: "/images/Lome.jpg", slug: "lome" },
  { city: "Conakry", country: "Guinea", region: "West Africa", tag: "The Land of the Fouta Djallon", image: "/images/Conakry.jpg", slug: "conakry" },

  // East Africa
  { city: "Nairobi", country: "Kenya", region: "East Africa", tag: "Green City in the Sun", image: "/images/Nairobi.jpg", slug: "nairobi" },
  { city: "Mombasa", country: "Kenya", region: "East Africa", tag: "Swahili coastal gateway", image: "/images/Mombasa.jpg", slug: "mombasa" },
  { city: "Addis Ababa", country: "Ethiopia", region: "East Africa", tag: "Capital of Africa", image: "/images/Addis-Ababa.jpg", slug: "addis-ababa" },
  { city: "Dar es Salaam", country: "Tanzania", region: "East Africa", tag: "Haven of Peace", image: "/images/Dar-es-Salaam.jpg", slug: "dar-es-salaam" },
  { city: "Zanzibar", country: "Tanzania", region: "East Africa", tag: "Spice Islands of the Indian Ocean", image: "/images/Zanzibar.jpg", slug: "zanzibar" },
  { city: "Kampala", country: "Uganda", region: "East Africa", tag: "Pearl of Africa's capital", image: "/images/Kampala.jpg", slug: "kampala" },
  { city: "Kigali", country: "Rwanda", region: "East Africa", tag: "Land of a Thousand Hills", image: "/images/Kigali.jpg", slug: "kigali" },
  { city: "Lusaka", country: "Zambia", region: "East Africa", tag: "The real Africa gateway", image: "/images/Lusaka.jpg", slug: "lusaka" },
  { city: "Harare", country: "Zimbabwe", region: "East Africa", tag: "Sunshine city", image: "/images/Harare.jpg", slug: "harare" },
  { city: "Victoria Falls", country: "Zimbabwe", region: "East Africa", tag: "The Smoke that Thunders", image: "/images/Victoria-Falls.jpg", slug: "victoria-falls" },
  { city: "Maputo", country: "Mozambique", region: "East Africa", tag: "Pearl of the Indian Ocean", image: "/images/Maputo.jpg", slug: "maputo" },
  { city: "Antananarivo", country: "Madagascar", region: "East Africa", tag: "City of a Thousand Warriors", image: "/images/Antananarivo.jpg", slug: "antananarivo" },
  { city: "Lilongwe", country: "Malawi", region: "East Africa", tag: "The Warm Heart of Africa", image: "/images/Lilongwe.jpg", slug: "lilongwe" },

  // Southern Africa
  { city: "Cape Town", country: "South Africa", region: "Southern Africa", tag: "The Mother City", image: "/images/cape-town.jpg", slug: "cape-town" },
  { city: "Johannesburg", country: "South Africa", region: "Southern Africa", tag: "City of Gold", image: "/images/Johannesburg.jpg", slug: "johannesburg" },
  { city: "Durban", country: "South Africa", region: "Southern Africa", tag: "Surf city of South Africa", image: "/images/Durban.jpg", slug: "durban" },
  { city: "Gaborone", country: "Botswana", region: "Southern Africa", tag: "Gateway to the Okavango", image: "/images/Gaborone.jpg", slug: "gaborone" },
  { city: "Windhoek", country: "Namibia", region: "Southern Africa", tag: "Where desert meets city", image: "/images/Windhoek.jpg", slug: "windhoek" },
  { city: "Luanda", country: "Angola", region: "Southern Africa", tag: "Paris of Africa", image: "/images/Luanda.jpg", slug: "luanda" },

  // Central Africa
  { city: "Douala", country: "Cameroon", region: "Central Africa", tag: "Economic powerhouse of Cameroon", image: "/images/Douala.jpg", slug: "douala" },
  { city: "Yaoundé", country: "Cameroon", region: "Central Africa", tag: "City of Seven Hills", image: "/images/Yaounde.jpg", slug: "yaounde" },
  { city: "Libreville", country: "Gabon", region: "Central Africa", tag: "Green capital of Gabon", image: "/images/Libreville.jpg", slug: "libreville" },
  { city: "Kinshasa", country: "DRC", region: "Central Africa", tag: "Africa's third-largest city", image: "/images/Kinshasa.jpg", slug: "kinshasa" },
  { city: "Brazzaville", country: "Congo", region: "Central Africa", tag: "The other side of the river", image: "/images/Brazzaville.jpg", slug: "brazzaville" },

  // North Africa
  { city: "Marrakech", country: "Morocco", region: "North Africa", tag: "The Red City", image: "/images/Marrakech.jpg", slug: "marrakech" },
  { city: "Casablanca", country: "Morocco", region: "North Africa", tag: "Where classic meets modern", image: "/images/Casablanca.jpg", slug: "casablanca" },
  { city: "Cairo", country: "Egypt", region: "North Africa", tag: "City of a Thousand Minarets", image: "/images/Cairo.jpg", slug: "cairo" },
  { city: "Tunis", country: "Tunisia", region: "North Africa", tag: "Mediterranean gateway to Africa", image: "/images/Tunis.jpg", slug: "tunis" },
  { city: "Algiers", country: "Algeria", region: "North Africa", tag: "White city on the Mediterranean", image: "/images/Algiers.jpg", slug: "algiers" },
];
