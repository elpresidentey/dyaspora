export type Event = {
  title: string;
  city: string;
  country: string;
  category: string;
  date: string;
  image: string;
  description: string;
  slug: string;
};

export const events: Event[] = [
  { title: "Detty December Lagos", city: "Lagos", country: "Nigeria", category: "Music", date: "Dec 12–31, 2026", image: "/images/Lagos.jpg", description: "A month of live music, rooftop nights, art, and the electric energy of Lagos.", slug: "detty-december-lagos" },
  { title: "Accra Arts & Culture Week", city: "Accra", country: "Ghana", category: "Culture", date: "Oct 18–24, 2026", image: "/images/Accra.jpg", description: "Contemporary art, design, fashion, and the people shaping Ghana's creative scene.", slug: "accra-arts-week" },
  { title: "Dakar Biennale", city: "Dakar", country: "Senegal", category: "Art", date: "Nov 4–18, 2026", image: "/images/Dakar.jpg", description: "A landmark celebration of African contemporary art across the city.", slug: "dakar-biennale" },
  { title: "Marrakech International Film Festival", city: "Marrakech", country: "Morocco", category: "Film", date: "Nov 27–Dec 5, 2026", image: "/images/Marrakech.jpg", description: "Cinema, premieres, and conversations in the ochre city.", slug: "marrakech-film-fest" },
  { title: "Kigali Jazz Junction", city: "Kigali", country: "Rwanda", category: "Music", date: "Sep 19, 2026", image: "/images/Kigali.jpg", description: "A soulful night of live jazz and new African sounds.", slug: "kigali-jazz-junction" },
  { title: "Cape Town Design Month", city: "Cape Town", country: "South Africa", category: "Design", date: "Oct 1–31, 2026", image: "/images/cape-town.jpg", description: "A city-wide programme of studios, exhibitions, and design conversations.", slug: "cape-town-design-month" },
];
