export type PlaceImage = {
  id: number;
  placeId: number;
  url: string;
  isPrimary: boolean;
  order: number;
  createdAt: Date;
};

export type PlaceCategory = {
  placeId: number;
  categoryId: number;
};

export type Place = {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  priceRange: string;
  status: string;
  rating: number;
  images: PlaceImage[];
  categories: PlaceCategory[];
};
