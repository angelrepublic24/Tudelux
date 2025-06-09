// src/services/hooks/useMaterialService.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MaterialApi } from "../Api/material.api";
import { MaterialFormType } from "../schemas/materials.schema";

export function useGetMaterials() {
  return useQuery({
    queryKey: ['materials'],
    queryFn: MaterialApi.getAll,
  });
}

export function useCreateMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MaterialFormType) => MaterialApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
    }
  });
}

export function useUpdateMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number, data: MaterialFormType }) => MaterialApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
    }
  });
}

export function useDeleteMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => MaterialApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
    }
  });
}
