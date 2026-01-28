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
