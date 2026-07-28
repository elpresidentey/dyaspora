export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type WithPagination<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";

export type Currency = "NGN" | "GHS" | "KES" | "ZAR" | "USD" | "GBP" | "EUR";

export type Price = {
  amount: number;
  currency: Currency;
};
