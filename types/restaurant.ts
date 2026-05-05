export interface RestaurantImage {
  id: string;
  url: string;
  isPrimary: boolean;
  order: number;
}

export interface RestaurantCategory {
  id: string;
  name: string;
}

export interface RestaurantOffer {
  id: string;
  tag: string;      // short badge label e.g. "20% OFF"
  title: string;    // e.g. "20% off all drinks"
  sub: string;      // e.g. "Daily 2pm – 5pm"
  expiresAt?: string;
}

export interface RestaurantReview {
  id: string;
  authorName: string;
  authorInitials: string;
  stars: number;    // 1–5
  text: string;
  createdAt?: string;
}

export interface RestaurantHours {
  label: string;    // e.g. "Mon–Sun · 8:00 AM – 10:00 PM"
  isOpenNow: boolean;
  closesSoon?: boolean;
}

export interface RestaurantLocation {
  address: string;
  latitude: number;
  longitude: number;
  distance?: string;  // human-readable e.g. "0.3 km"
}

export interface Restaurant {
  // identity
  id: string;
  name: string;
  description?: string;
  cuisine?: string;

  // visuals
  images: RestaurantImage[];
  wheelLabel?: string;  // short label for spin wheel segment e.g. "Burger"

  // content
  about?: string;

  // meta
  rating: number;
  reviewCount?: number;
  priceRange?: string;  // e.g. "$$" or "RM 18 – RM 45"
  priceLevel?: 1 | 2 | 3 | 4;

  // status
  hours?: RestaurantHours;
  phone?: string;

  // location
  location: RestaurantLocation;

  // promos & offers
  promoTag?: string;    // short badge e.g. "20% OFF"
  promoText?: string;   // description e.g. "20% off all burgers today"
  offers: RestaurantOffer[];

  // discovery
  categories: RestaurantCategory[];
  reviews: RestaurantReview[];

  // timestamps
  createdAt?: string;
  updatedAt?: string;
}
