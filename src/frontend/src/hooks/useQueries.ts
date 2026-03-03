import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Bike } from "../backend";
import { useActor } from "./useActor";

export function useGetAllBikes() {
  const { actor, isFetching } = useActor();

  return useQuery<Bike[]>({
    queryKey: ["bikes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBikes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBike(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Bike>({
    queryKey: ["bike", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error("No actor or id");
      return actor.getBike(id);
    },
    enabled: !!actor && !isFetching && id !== null,
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
