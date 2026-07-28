export type Restaurant = {
  name: string;
  city: string;
  country: string;
  cuisine: string;
  description: string;
  image: string;
  rating: number;
  priceRange: string;
  slug: string;
};

export const restaurants: Restaurant[] = [
  { name: "Nkoyo", city: "Lagos", country: "Nigeria", cuisine: "Nigerian", description: "Refined Nigerian classics in a warm, art-filled setting on Victoria Island.", image: "/images/Lagos.jpg", rating: 4.6, priceRange: "$$$", slug: "nkoyo-lagos" },
  { name: "Bistro Toulouse", city: "Lagos", country: "Nigeria", cuisine: "French", description: "Intimate French bistro with a loyal following among Lagos creatives.", image: "/images/Lagos.jpg", rating: 4.5, priceRange: "$$$", slug: "bistro-toulouse-lagos" },
  { name: "The Buka", city: "Accra", country: "Ghana", cuisine: "Ghanaian", description: "Modern Ghanaian comfort food — think jollof, waakye, and grilled tilapia done right.", image: "/images/Accra.jpg", rating: 4.4, priceRange: "$$", slug: "buka-accra" },
  { name: "Santoku", city: "Accra", country: "Ghana", cuisine: "Japanese", description: "Omakase and robata grill in a sleek Labone space.", image: "/images/Accra.jpg", rating: 4.7, priceRange: "$$$$", slug: "santoku-accra" },
  { name: "Carnivore", city: "Nairobi", country: "Kenya", cuisine: "Kenyan", description: "Iconic nyama choma experience — Kenya's most famous restaurant.", image: "/images/Nairobi.jpg", rating: 4.3, priceRange: "$$$", slug: "carnivore-nairobi" },
  { name: "Talisman", city: "Nairobi", country: "Kenya", cuisine: "Mediterranean", description: "Garden restaurant with Pan-African flavours and an exceptional wine list.", image: "/images/Nairobi.jpg", rating: 4.6, priceRange: "$$$", slug: "talisman-nairobi" },
  { name: "The Test Kitchen", city: "Cape Town", country: "South Africa", cuisine: "Contemporary", description: "World-renowned tasting menu in a converted biscuit mill.", image: "/images/cape-town.jpg", rating: 4.8, priceRange: "$$$$", slug: "test-kitchen-cape-town" },
  { name: "Gold Restaurant", city: "Cape Town", country: "South Africa", cuisine: "African", description: "Pan-African dining with live djembe and marimba performances.", image: "/images/cape-town.jpg", rating: 4.4, priceRange: "$$$", slug: "gold-restaurant-cape-town" },
  { name: "Republique", city: "Kigali", country: "Rwanda", cuisine: "International", description: "Rooftop dining overlooking Kigali with a menu that spans the globe.", image: "/images/Kigali.jpg", rating: 4.5, priceRange: "$$$", slug: "republique-kigali" },
  { name: "La Saveur", city: "Kigali", country: "Rwanda", cuisine: "French", description: "Elegant French-Rwandan fusion in a restored colonial villa.", image: "/images/Kigali.jpg", rating: 4.6, priceRange: "$$$$", slug: "la-saveur-kigali" },
  { name: "Nobu", city: "Marrakech", country: "Morocco", cuisine: "Japanese", description: "World-famous Japanese within the Es Saadi Marrakech resort.", image: "/images/Marrakech.jpg", rating: 4.7, priceRange: "$$$$", slug: "nobu-marrakech" },
  { name: "Le Jardin", city: "Marrakech", country: "Morocco", cuisine: "Moroccan", description: "Secret garden restaurant hidden down a medina alley — tagines and tranquility.", image: "/images/Marrakech.jpg", rating: 4.5, priceRange: "$$$", slug: "le-jardin-marrakech" },
  { name: "Chez Lamine", city: "Dakar", country: "Senegal", cuisine: "Senegalese", description: "Family-run thiéboudienne specialist overlooking the Corniche.", image: "/images/Dakar.jpg", rating: 4.3, priceRange: "$$", slug: "chez-lamine-dakar" },
  { name: "La Fourchette", city: "Abidjan", country: "Côte d'Ivoire", cuisine: "Ivorian", description: "Abidjan institution serving attiéké and grilled fish since 1985.", image: "/images/Abidjan.jpg", rating: 4.4, priceRange: "$$", slug: "la-fourchette-abidjan" },
  { name: "Abyssinia", city: "Addis Ababa", country: "Ethiopia", cuisine: "Ethiopian", description: "Traditional coffee ceremony and injera feasts in a cultural setting.", image: "/images/Addis-Ababa.jpg", rating: 4.5, priceRange: "$$", slug: "abyssinia-addis-ababa" },
];
