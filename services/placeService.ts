import { Place } from "@/types/place";
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
