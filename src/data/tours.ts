export type Tour = {
  name: string;
  city: string;
  country: string;
  category: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  slug: string;
};

export const tours: Tour[] = [
  { name: "Lagos Lagoon Boat Tour", city: "Lagos", country: "Nigeria", category: "Water", description: "Explore the lagoon from Makoko floating village to Tarkwa Bay beach.", image: "/images/Lagos.jpg", duration: "4 hours", price: 65, slug: "lagos-lagoon" },
  { name: "Badagry Heritage Walk", city: "Lagos", country: "Nigeria", category: "History", description: "Walk the Slave Trade route through the Point of No Return museum.", image: "/images/Lagos.jpg", duration: "Full day", price: 80, slug: "badagry-heritage" },
  { name: "W.E.B. Du Bois Centre Tour", city: "Accra", country: "Ghana", category: "History", description: "Visit the final residence and burial site of the Pan-Africanist pioneer.", image: "/images/Accra.jpg", duration: "2 hours", price: 25, slug: "du-bois-centre" },
  { name: "Cape Coast Castle Tour", city: "Accra", country: "Ghana", category: "History", description: "Day trip to the UNESCO-listed slave castle along Ghana's coast.", image: "/images/Accra.jpg", duration: "Full day", price: 90, slug: "cape-coast-castle" },
  { name: "Nairobi National Park Safari", city: "Nairobi", country: "Kenya", category: "Wildlife", description: "See lions, giraffes, and rhinos with the city skyline in the background.", image: "/images/Nairobi.jpg", duration: "6 hours", price: 120, slug: "nairobi-national-park" },
  { name: "Giraffe Centre Visit", city: "Nairobi", country: "Kenya", category: "Wildlife", description: "Feed and learn about endangered Rothschild giraffes up close.", image: "/images/Nairobi.jpg", duration: "1.5 hours", price: 15, slug: "giraffe-centre" },
  { name: "Table Mountain Cableway", city: "Cape Town", country: "South Africa", category: "Adventure", description: "Rotating cable car ride to the top of Cape Town's iconic landmark.", image: "/images/cape-town.jpg", duration: "3 hours", price: 35, slug: "table-mountain" },
  { name: "Robben Island Ferry & Tour", city: "Cape Town", country: "South Africa", category: "History", description: "Ferry to the island prison that held Nelson Mandela for 18 years.", image: "/images/cape-town.jpg", duration: "4 hours", price: 55, slug: "robben-island" },
  { name: "Kigali Genocide Memorial", city: "Kigali", country: "Rwanda", category: "History", description: "A moving and essential visit to Rwanda's memorial and education centre.", image: "/images/gisozi-genocide-memorial.jpg", duration: "2 hours", price: 0, slug: "kigali-memorial" },
  { name: "Kigali Coffee Tour", city: "Kigali", country: "Rwanda", category: "Food", description: "From bean to cup — visit a coffee cooperative and taste Rwandan specialty coffee.", image: "/images/Kigali.jpg", duration: "3 hours", price: 35, slug: "kigali-coffee" },
  { name: "Djemaa el-Fna Food Tour", city: "Marrakech", country: "Morocco", category: "Food", description: "Evening walking tour through the legendary square's food stalls.", image: "/images/Marrakech.jpg", duration: "3 hours", price: 45, slug: "jemaa-el-fna" },
  { name: "Majorelle Garden & Museum", city: "Marrakech", country: "Morocco", category: "Culture", description: "Yves Saint Laurent's stunning blue garden and Berber museum.", image: "/images/Marrakech.jpg", duration: "2 hours", price: 20, slug: "majorelle-garden" },
  { name: "Île de Ngor Escape", city: "Dakar", country: "Senegal", category: "Beach", description: "A 20-minute pirogue ride to the island with beaches, galleries, and seafood.", image: "/images/Dakar.jpg", duration: "Half day", price: 30, slug: "ile-de-ngor" },
  { name: "Lac Rose ATV Ride", city: "Dakar", country: "Senegal", category: "Adventure", description: "Quad bike across the pink lake's salt flats — surreal and unforgettable.", image: "/images/Dakar.jpg", duration: "4 hours", price: 70, slug: "lac-rose" },
  { name: "Victoria Falls Helicopter Tour", city: "Victoria Falls", country: "Zimbabwe", category: "Adventure", description: "Soar above the falls for a panoramic view of the smoke that thunders.", image: "/images/Victoria-Falls.jpg", duration: "30 min", price: 150, slug: "vic-falls-helicopter" },
];
