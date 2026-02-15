import { getPlaceById } from "@/services/placeService";
import { useQuery } from "@tanstack/react-query";

export function useGetPlaceById(placeId: number) {
  return useQuery({
    queryKey: ["place", placeId],
    queryFn: () => getPlaceById(placeId),
    staleTime: 1000 * 60 * 5,
  });
}
