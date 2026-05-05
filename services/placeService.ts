import {
  Place,
  NearbyParams,
  PlaceWithDistance,
  PromoPlace,
  ReviewResponse,
  SuggestionsParams,
} from "@/types/place";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchAllPlaces = async (): Promise<Place[]> => {
  const res = await fetch(`${API_URL}/api/places/getAllPlaces`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Fetchign all places failed");
  }
  return data;
};

export const fetchWheelHistory = async (userId: number): Promise<Place[]> => {
  const res = await fetch(
    `${API_URL}/api/places/wheel-history?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Fetching Wheel History Failed");
  }
  return data;
};

export const updateWheelHistory = async (userId: number, placeId: number) => {
  try {
    const res = await fetch(`${API_URL}/api/places/wheel-history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, placeId }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, data };
    }
    return { success: true, data };
  } catch (e: any) {
    return {
      success: false,
      errors: e.message,
    };
  }
};

export const getPlaceById = async (placeId: number) => {
  const res = await fetch(`${API_URL}/api/places/getPlaceById/${placeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Unable to Fetch Restaurant Details");
  }
  return data;
};

export const fetchNearbyPlaces = async (
  params: NearbyParams,
): Promise<PlaceWithDistance[]> => {
  const qs = new URLSearchParams();
  qs.set("lat", String(params.lat));
  qs.set("lng", String(params.lng));
  if (params.radius != null) qs.set("radius", String(params.radius));
  if (params.openNow != null) qs.set("openNow", String(params.openNow));
  if (params.hasPromo != null) qs.set("hasPromo", String(params.hasPromo));
  if (params.priceIndex != null) qs.set("priceIndex", String(params.priceIndex));
  if (params.rating != null) qs.set("rating", String(params.rating));
  if (params.cuisine) {
    const cuisines = Array.isArray(params.cuisine)
      ? params.cuisine
      : [params.cuisine];
    cuisines.forEach((c) => qs.append("cuisine", c));
  }

  const res = await fetch(`${API_URL}/api/places/nearby?${qs.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Fetching nearby places failed");
  return data;
};

export const fetchPromos = async (
  lat: number,
  lng: number,
  radius?: number,
): Promise<PromoPlace[]> => {
  const qs = new URLSearchParams({ lat: String(lat), lng: String(lng) });
  if (radius != null) qs.set("radius", String(radius));

  const res = await fetch(`${API_URL}/api/places/promos?${qs.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Fetching promos failed");
  return data;
};

export const fetchSuggestions = async (
  params: SuggestionsParams,
): Promise<Place[]> => {
  const qs = new URLSearchParams({ userId: String(params.userId) });
  if (params.lat != null) qs.set("lat", String(params.lat));
  if (params.lng != null) qs.set("lng", String(params.lng));
  if (params.radius != null) qs.set("radius", String(params.radius));
  if (params.limit != null) qs.set("limit", String(params.limit));

  const res = await fetch(
    `${API_URL}/api/places/suggestions?${qs.toString()}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );

  const data = await res.json();
  if (!res.ok) throw new Error("Fetching suggestions failed");
  return data;
};

export const submitReview = async (
  placeId: number,
  token: string,
  review: { rating?: number; content?: string },
): Promise<ReviewResponse> => {
  const res = await fetch(`${API_URL}/api/places/${placeId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(review),
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Submitting review failed");
  return data;
};
