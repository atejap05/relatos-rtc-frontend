'use client';

import { useQuery, useQueries, useMutation, useQueryClient } from '@tanstack/react-query';
import { relatosApi } from '@/lib/api';
import type { Relato, RelatoCreate, RelatoUpdate, StatusEnum } from '@/types/relato';
import { ABAS } from '@/types/relato';
import { toast } from 'sonner';

// Query keys
export const relatosKeys = {
  all: ['relatos'] as const,
  lists: () => [...relatosKeys.all, 'list'] as const,
  list: (aba: string, filters?: { status?: StatusEnum }) => [...relatosKeys.lists(), aba, filters] as const,
  details: () => [...relatosKeys.all, 'detail'] as const,
  detail: (aba: string, id: string) => [...relatosKeys.details(), aba, id] as const,
};

// Hook para listar todos os relatos de uma aba específica
export function useRelatos(aba: string) {
  return useQuery({
    queryKey: relatosKeys.list(aba),
    queryFn: () => relatosApi.getAll(aba),
    enabled: !!aba,
  });
}

// Hook para buscar relatos de todas as abas
export function useAllRelatos() {
  const queries = useQueries({
    queries: ABAS.map(aba => ({
      queryKey: relatosKeys.list(aba),
      queryFn: () => relatosApi.getAll(aba),
    })),
  });

  const isLoading = queries.some(query => query.isLoading);
  const isError = queries.some(query => query.isError);
  const error = queries.find(query => query.isError)?.error;

  // Combina todos os relatos e adiciona informação da aba de origem
  const allRelatos: Array<Relato & { aba: string }> = queries
    .flatMap((query, index) => {
      const relatos = query.data || [];
      return relatos.map(relato => ({
        ...relato,
        aba: ABAS[index],
      }));
    })
    .filter(Boolean);

  return {
    data: allRelatos,
    isLoading,
    isError,
    error,
  };
}

// Hook para buscar relato por ID
export function useRelato(aba: string, numeroDemanda: string) {
  return useQuery({
    queryKey: relatosKeys.detail(aba, numeroDemanda),
    queryFn: () => relatosApi.getById(aba, numeroDemanda),
    enabled: !!aba && !!numeroDemanda,
  });
}

// Hook para filtrar por status
export function useRelatosByStatus(aba: string, status: StatusEnum) {
  return useQuery({
    queryKey: relatosKeys.list(aba, { status }),
    queryFn: () => relatosApi.getByStatus(aba, status),
    enabled: !!aba,
  });
}

// Hook para criar relato
export function useCreateRelato(aba: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (relato: RelatoCreate) => relatosApi.create(aba, relato),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: relatosKeys.list(aba) });
      toast.success('Relato criado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao criar relato');
    },
  });
}

// Hook para atualizar relato
export function useUpdateRelato(aba: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ numeroDemanda, data }: { numeroDemanda: string; data: RelatoUpdate }) =>
      relatosApi.update(aba, numeroDemanda, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: relatosKeys.list(aba) });
      queryClient.invalidateQueries({ queryKey: relatosKeys.detail(aba, variables.numeroDemanda) });
      toast.success('Relato atualizado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao atualizar relato');
    },
  });
}

// Hook para deletar relato
export function useDeleteRelato(aba: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (numeroDemanda: string) => relatosApi.delete(aba, numeroDemanda),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: relatosKeys.list(aba) });
      toast.success('Relato removido com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Erro ao remover relato');
    },
  });
}

