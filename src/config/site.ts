import type { SiteConfig, NavGroup } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Dyaspora",
  description:
    "The modern homecoming platform for Africans around the world. Book flights, accommodation, events, and more.",
  url: "https://dyaspora.com",
  ogImage: "https://dyaspora.com/og.jpg",
  links: {
    twitter: "https://twitter.com/dyaspora",
    github: "https://github.com/dyaspora",
  },
};

export const mainNav: NavGroup[] = [
  {
    title: "Explore",
    items: [
      { title: "Flights", href: "/flights" },
      { title: "Accommodation", href: "/accommodation" },
      { title: "Events", href: "/events" },
      { title: "Restaurants", href: "/restaurants" },
      { title: "Transport", href: "/transport" },
      { title: "Tourism", href: "/tourism" },
    ],
  },
  {
    title: "Discover",
    items: [
      { title: "Cities", href: "/cities" },
      { title: "Experiences", href: "/experiences" },
      { title: "About", href: "/about" },
    ],
  },
];

export const dashboardNav: NavGroup[] = [
  {
    title: "Menu",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: "layout-dashboard" },
      { title: "Bookings", href: "/bookings", icon: "calendar-check" },
      { title: "Saved", href: "/saved", icon: "bookmark" },
      { title: "Messages", href: "/messages", icon: "message-circle" },
      { title: "Profile", href: "/profile", icon: "user" },
      { title: "Settings", href: "/settings", icon: "settings" },
    ],
  },
];
