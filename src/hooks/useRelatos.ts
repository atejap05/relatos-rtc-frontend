'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { relatosApi } from '@/lib/api';
import type { Relato, RelatoCreate, RelatoUpdate, StatusEnum } from '@/types/relato';
import { toast } from 'sonner';

// Query keys
export const relatosKeys = {
  all: ['relatos'] as const,
  lists: () => [...relatosKeys.all, 'list'] as const,
  list: (filters?: { status?: StatusEnum }) => [...relatosKeys.lists(), filters] as const,
  details: () => [...relatosKeys.all, 'detail'] as const,
  detail: (id: string) => [...relatosKeys.details(), id] as const,
};

// Hook para listar todos os relatos
export function useRelatos() {
  return useQuery({
    queryKey: relatosKeys.lists(),
    queryFn: () => relatosApi.getAll(),
  });
}

// Hook para buscar relato por ID
export function useRelato(numeroDemanda: string) {
  return useQuery({
    queryKey: relatosKeys.detail(numeroDemanda),
    queryFn: () => relatosApi.getById(numeroDemanda),
    enabled: !!numeroDemanda,
  });
}

// Hook para filtrar por status
export function useRelatosByStatus(status: StatusEnum) {
  return useQuery({
    queryKey: relatosKeys.list({ status }),
    queryFn: () => relatosApi.getByStatus(status),
  });
}

// Hook para criar relato
export function useCreateRelato() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (relato: RelatoCreate) => relatosApi.create(relato),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: relatosKeys.lists() });
      toast.success('Relato criado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao criar relato');
    },
  });
}

// Hook para atualizar relato
export function useUpdateRelato() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ numeroDemanda, data }: { numeroDemanda: string; data: RelatoUpdate }) =>
      relatosApi.update(numeroDemanda, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: relatosKeys.lists() });
      queryClient.invalidateQueries({ queryKey: relatosKeys.detail(variables.numeroDemanda) });
      toast.success('Relato atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao atualizar relato');
    },
  });
}

// Hook para deletar relato
export function useDeleteRelato() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (numeroDemanda: string) => relatosApi.delete(numeroDemanda),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: relatosKeys.lists() });
      toast.success('Relato removido com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao remover relato');
    },
  });
}

