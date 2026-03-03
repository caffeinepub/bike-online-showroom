import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Bike } from "../backend";
import { STATIC_BIKES, getBikeById } from "../utils/bikeData";
import { useActor } from "./useActor";

export function useGetAllBikes() {
  const { actor } = useActor();

  return useQuery<Bike[]>({
    queryKey: ["bikes-static"],
    queryFn: async () => {
      // Try to get data from backend, fall back to static data on failure
      if (actor) {
        try {
          const result = await actor.getAllBikes();
          if (result && result.length > 0) {
            return result;
          }
        } catch {
          // Fall through to static data
        }
      }
      // Always return static data as fallback so bikes are always visible
      return STATIC_BIKES;
    },
    enabled: true,
    staleTime: 30000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // Provide static bikes as initial data so they show immediately
    initialData: STATIC_BIKES,
  });
}

export function useGetBike(id: bigint | null) {
  const { actor } = useActor();

  return useQuery<Bike>({
    queryKey: ["bike-static", id?.toString()],
    queryFn: async () => {
      if (id === null) throw new Error("No id");
      // Try backend first
      if (actor) {
        try {
          const result = await actor.getBike(id);
          if (result) return result;
        } catch {
          // Fall through to static data
        }
      }
      // Fall back to static data
      const bike = getBikeById(id);
      if (bike) return bike;
      throw new Error("Bike not found");
    },
    enabled: id !== null,
    staleTime: 30000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // Provide static bike as initial data
    initialData: id !== null ? getBikeById(id) : undefined,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      bikeId,
      message,
    }: {
      name: string;
      email: string;
      phone: string;
      bikeId: bigint;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitInquiry(name, email, phone, bikeId, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
