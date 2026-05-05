import {
  fetchAllPlaces,
  fetchNearbyPlaces,
  fetchPromos,
  fetchSuggestions,
  fetchWheelHistory,
  getPlaceById,
  submitReview,
  updateWheelHistory,
} from "@/services/placeService";
import { NearbyParams, SuggestionsParams } from "@/types/place";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useGetAllPlaces() {
  return useQuery({
    queryKey: ["places"],
    queryFn: fetchAllPlaces,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetPlaceById(placeId: number) {
  return useQuery({
    queryKey: ["place", placeId],
    queryFn: () => getPlaceById(placeId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useNearbyPlaces(params: NearbyParams) {
  return useQuery({
    queryKey: ["places", "nearby", params],
    queryFn: () => fetchNearbyPlaces(params),
    staleTime: 1000 * 60 * 2,
    enabled: params.lat != null && params.lng != null,
  });
}

export function usePromos(lat: number, lng: number, radius?: number) {
  return useQuery({
    queryKey: ["places", "promos", lat, lng, radius],
    queryFn: () => fetchPromos(lat, lng, radius),
    staleTime: 1000 * 60 * 5,
    enabled: lat != null && lng != null,
  });
}

export function useSuggestions(params: SuggestionsParams) {
  return useQuery({
    queryKey: ["places", "suggestions", params],
    queryFn: () => fetchSuggestions(params),
    staleTime: 1000 * 60 * 5,
    enabled: params.userId != null,
  });
}

export function useWheelHistory(userId: number) {
  return useQuery({
    queryKey: ["places", "wheel-history", userId],
    queryFn: () => fetchWheelHistory(userId),
    staleTime: 1000 * 60 * 5,
    enabled: userId != null,
  });
}

export function useUpdateWheelHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, placeId }: { userId: number; placeId: number }) =>
      updateWheelHistory(userId, placeId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["places", "wheel-history", userId] });
    },
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      placeId,
      token,
      review,
    }: {
      placeId: number;
      token: string;
      review: { rating?: number; content?: string };
    }) => submitReview(placeId, token, review),
    onSuccess: (_, { placeId }) => {
      queryClient.invalidateQueries({ queryKey: ["place", placeId] });
    },
  });
}
