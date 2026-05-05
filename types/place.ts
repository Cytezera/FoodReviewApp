export type PlaceImage = {
  id: number;
  placeId: number;
  url: string;
  isPrimary: boolean;
  order?: number;
  createdAt: Date;
};

export type PlaceCategory = {
  placeId: number;
  categoryId: number;
};

export type Place = {
  id: number;
  name: string;
  description: string | null;
  address: string;
  latitude: number;
  longitude: number;
  priceRange: string | null;
  status: string | null;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
  images: PlaceImage[];
  categories: PlaceCategory[];
};

export type PlaceWithDistance = Place & {
  distanceMetres: number;
  distance: string;
};

export type PromoPlace = PlaceWithDistance & {
  promoTag: string;
  promoText: string;
};

export type ReviewUser = {
  id: number;
  name: string;
  profilePicUrl: string;
};

export type ReviewResponse = {
  id: number;
  placeId: number;
  userId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
};

export type BookmarkResponse = {
  id: number;
  userId: number;
  placeId: number;
  type: string;
  createdAt: string;
};

export type NearbyParams = {
  lat: number;
  lng: number;
  radius?: number;
  openNow?: boolean;
  hasPromo?: boolean;
  priceIndex?: number;
  rating?: number;
  cuisine?: string | string[];
};

export type SuggestionsParams = {
  userId: number;
  lat?: number;
  lng?: number;
  radius?: number;
  limit?: number;
};