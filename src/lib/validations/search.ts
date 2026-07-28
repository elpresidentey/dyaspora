import { z } from "zod";

export const flightSearchSchema = z.object({
  from: z.string().min(3, "Origin is required"),
  to: z.string().min(3, "Destination is required"),
  departDate: z.string().min(1, "Departure date is required"),
  returnDate: z.string().optional(),
  passengers: z.number().int().min(1).max(9).default(1),
  cabinClass: z.enum(["economy", "premium_economy", "business", "first"]).default("economy"),
});

export const hotelSearchSchema = z.object({
  location: z.string().min(2, "Location is required"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.number().int().min(1).max(20).default(1),
  rooms: z.number().int().min(1).max(10).default(1),
});

export const eventSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  city: z.string().optional(),
  date: z.string().optional(),
});

export type FlightSearchInput = z.infer<typeof flightSearchSchema>;
export type HotelSearchInput = z.infer<typeof hotelSearchSchema>;
export type EventSearchInput = z.infer<typeof eventSearchSchema>;
