import axios from 'axios';
import type { Relato, RelatoCreate, RelatoUpdate, StatusEnum } from '@/types/relato';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const relatosApi = {
  // Listar todos os relatos
  getAll: async (): Promise<Relato[]> => {
    const response = await api.get<Relato[]>('/relatos');
    return response.data;
  },

  // Buscar relato por ID
  getById: async (numeroDemanda: string): Promise<Relato> => {
    const response = await api.get<Relato>(`/relatos/${numeroDemanda}`);
    return response.data;
  },

  // Criar novo relato
  create: async (relato: RelatoCreate): Promise<Relato> => {
    const response = await api.post<Relato>('/relatos', relato);
    return response.data;
  },

  // Atualizar relato
  update: async (numeroDemanda: string, relato: RelatoUpdate): Promise<Relato> => {
    const response = await api.put<Relato>(`/relatos/${numeroDemanda}`, relato);
    return response.data;
  },

  // Deletar relato
  delete: async (numeroDemanda: string): Promise<void> => {
    await api.delete(`/relatos/${numeroDemanda}`);
  },

  // Filtrar por status
  getByStatus: async (status: StatusEnum): Promise<Relato[]> => {
    const response = await api.get<Relato[]>(`/relatos/status/${status}`);
    return response.data;
  },
};

export default api;

